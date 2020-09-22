<?php

namespace App\Http\Controllers;

use App\Mail\LaravelMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
 
class MailController extends Controller
{
    public function sendEmail($email, $name){

        $details = [
            'title' => 'Successfully Registered',
            'name' => $name
        ];

        Mail::to($email)->send(new LaravelMail($details));

        return "Email Sent";

    }
}
