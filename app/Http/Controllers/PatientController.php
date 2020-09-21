<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Patient::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = request()->validate([
            'firstName' => 'required',
            'lastName' => 'required',
            'contactNo' => 'required'
        ]);
        
        $query = Patient::firstOrCreate([
            'firstName' => $request['firstName'],
            'lastName' => $request['lastName'],
            'contactNo' => $request['contactNo'],
            'status' => $request['status']
            ]);

        if ($query->wasRecentlyCreated){
            return 'true';
        }else{
            return 'false';
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = request()->validate([
            'firstName' => 'required',
            'lastName' => 'required',
            'contactNo' => 'required',
        ]);

        $q = Patient::findorFail($id);
        $q->update($request->all());
        return $q;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $query = Patient::findOrFail($id);
        $query->delete();
    }

    public function getSpecificPatient(Request $request)
    {
        $patient = Patient::where('id',$request['id'])->get();
        return $patient;
    }
}
