<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers; 
use App\Http\Requests; 
use Illuminate\Http\Request; 
use App\Models\PaypalSettings;
use App\Models\Purchase;

/** All Paypal Details class **/ 
use PayPal\Rest\ApiContext; 
use PayPal\Auth\OAuthTokenCredential; 
use PayPal\Api\Amount; 
use PayPal\Api\Details; 
use PayPal\Api\Item; 
use PayPal\Api\ItemList; 
use PayPal\Api\Payer; 
use PayPal\Api\ExecutePayment; 
use PayPal\Api\Payment; 
use PayPal\Api\RedirectUrls; 
use PayPal\Api\PaymentExecution; 
use PayPal\Api\Transaction;


class PaymentController extends Controller
{
    // paypal constant variables
    public $cvClientID = "";
    public $cvClientSecret = "";
    
    public function create(Request $request)
    {

        $data = request()->validate([
            'amt' => 'required'
        ]);

        $paymentAmt = $request['amt'];
        // get paypal settings in db
        $ps =PaypalSettings::all();
        // foreach($ps as $p){
        //     return $cvClientID = $p->client_id;
        //     $cvClientSecret = $p->client_secret;
        // }
        $this->cvClientID = $ps[0]['client_id'];
        $this->cvClientSecret = $ps[0]['client_secret'];

        $apiContext = new \PayPal\Rest\ApiContext(
            new \PayPal\Auth\OAuthTokenCredential(
                $this->cvClientID,     // ClientID
                $this->cvClientSecret      // ClientSecret
            )
        );

        $payer = new Payer();
        $payer->setPaymentMethod("paypal"); 

        $item1 = new Item();
        $item1->setName('Ground Coffee 40 oz')
            ->setCurrency('USD')
            ->setQuantity(1)
            ->setSku("123123") // Similar to `item_number` in Classic API
            ->setPrice($paymentAmt);
        // $item2 = new Item();
        // $item2->setName('Granola bars')
        //     ->setCurrency('USD')
        //     ->setQuantity(5)
        //     ->setSku("321321") // Similar to `item_number` in Classic API
        //     ->setPrice(2);
        $itemList = new ItemList();
        $itemList->setItems(array($item1));

        $details = new Details();
        $details->setShipping(0)
            ->setTax(0)
            ->setSubtotal($paymentAmt);

        $amount = new Amount();
        $amount->setCurrency("USD")
            ->setTotal($paymentAmt)
            ->setDetails($details);

        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($itemList)
            ->setDescription("Payment description")
            ->setInvoiceNumber(uniqid());

        $redirectUrls = new RedirectUrls();
        $redirectUrls->setReturnUrl("http://localhost:3000/execute-payment?amt=".$paymentAmt)
            ->setCancelUrl("http://localhost:3000/cancel");

        $payment = new Payment();
        $payment->setIntent("sale")
            ->setPayer($payer)
            ->setRedirectUrls($redirectUrls)
            ->setTransactions(array($transaction));

        $payment->create($apiContext);

        return $payment->getApprovalLink();
    }

    public function execute(Request $request)
    {
        
        // get paypal settings in db
        $ps =PaypalSettings::all();
     
        $this->cvClientID = $ps[0]['client_id'];
        $this->cvClientSecret = $ps[0]['client_secret'];
        
        // After Step 1
        $apiContext = new \PayPal\Rest\ApiContext(
            new \PayPal\Auth\OAuthTokenCredential(
                $this->cvClientID,     // ClientID
                $this->cvClientSecret      // ClientSecret
            )
        );

        $paymentId = $request['paymentId'];
        $payment = Payment::get($paymentId, $apiContext);

        $execution = new PaymentExecution();
        $execution->setPayerId($request['payerId']);

        $transaction = new Transaction();
        $amount = new Amount();
        $details = new Details();

        $details->setShipping(0)
        ->setTax(0)
        ->setSubtotal($request['amt']);

        $amount->setCurrency('USD');
        $amount->setTotal($request['amt']);
        $amount->setDetails($details);
        $transaction->setAmount($amount);

        $execution->addTransaction($transaction);

        $result = $payment->execute($execution, $apiContext);

        $this->savePayments($request['userid'], $request['amt']);

        return $result;
        
    }

    public function updatePaypalSettings(Request $request){
        $data = request()->validate([
            'client_id' => 'required',
            'client_secret' => 'required'
        ]);

        $q = PaypalSettings::findorFail(1);
        $q->update($request->all());
        return $q;
    }

    public function getPaypalSettings(){
        return PaypalSettings::all();
    }

    public function savePayments($userid, $amt){
 
        $signatory = Purchase::Create(
            [
                'item' => 'donation', 
                'qty' => '1', 
                'amt' => $amt,
                'user_id' => $userid
            ]
        );

        if ($signatory->wasRecentlyCreated){
            return 'true';
        }else{
            return 'false';
        }
    }

    public function getPayments(Request $request)
    {
        $payments = Purchase::where('user_id', $request['id'])->get();
        return $payments;

    }
}
