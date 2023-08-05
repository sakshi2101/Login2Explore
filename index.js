/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var jpdbBaseUrl = "http://api.login2explore.com:5577";
var jpdbIRl ="/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "EMP-DB";
var empRelationName = "EmpData";
var connToken = "90931356|-31949323046306515|90950179";
function resetForm(){
    $('#empid').val("");
    $('#empname').val("");
    $('#empHRA').val("");
    $('#empDA').val("");
    $('#empEmail').val("");
    $('#empid').prop("disabled",false);
    $('#save').prop("disabled",true);
    $('#change').prop("disabled",true);
    $('#reser').prop("disabled",true);
    $('#empid').focus();
}

function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ''){
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj,empDBName, empRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseUrl, jpdbIrl);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $('#empid').focus();
    
}

function validateData(){
    if(empid === ''){
        alert("Enter valid data");
        $('#empid').focus();
        return "";
    }
    if(empName === ''){
        alert("Enter valid data");
        $('#empName').focus();
        return "";
    }
    if(empSalary === ''){
        alert("Enter valid data");
        $('#empSalary').focus();
        return "";
    }
    if(empHRA === ''){
        alert("Enter valid data");
        $('#empHRA').focus();
        return "";
    }
    if(empDA === ''){
        alert("Enter valid data");
        $('#empDA').focus();
        return "";
    }
    if(empEmail === ''){
        alert("Enter valid data");
        $('#empEmail').focus();
        return "";
    }
    var jsonStrObj = {
        id: empid,
        name: empName,
        salary: empSalary,
        hra: empHRA,
        da: empDA,
        email: empEmail
    };
    return JSON.stringify(jsonStrObj);
}

function getEmp(){
    var empIdJsonObj = getEmpIdAsJsonObj();
    var gtRequest = createGET_By_KEYRequest(connToken,empDBName,empRelationName,empIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseUrl,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(res.JsonObj.status === 400){
        $('#save').prop("disabled",false);
        $('#reset').prop("disabled",false);
    }
    else if(res.JsonObj.status === 200){
        $('#empid').prop('disabled',true);
    }
}

