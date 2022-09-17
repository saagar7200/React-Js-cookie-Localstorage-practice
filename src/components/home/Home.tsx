import React, { FC, useState,useEffect, } from 'react';
// import { useNavigate } from 'react-router-dom';
import Edit from '../pages/editpage/edit';
import {Idata} from '../../interface/dataInterface'

import axios from "axios"


import  './home.css'
import Loading from '../Loading';
// import { getEffectiveTypeParameterDeclarations } from 'typescript';

interface IProps {
    
}


const Home :FC<IProps> = (props) => {

    let local_data:any = localStorage.getItem("my_data");
    let data = JSON.parse(local_data)
    const [details, setDetails] = useState<Idata[]> (JSON.parse(local_data))

// const [details,setDetails] = useState<Idata[]>(local_data);
console.log("1st details",details)

const [isUpdated,setIsUpdated]= useState<boolean>(false);

const [isLoading,setIsloading] = useState(true);
const [error,setError] = useState<any >(null);
const [formError,setFormError] = useState({} as any);

const [isEdit, setIsEdit] = useState(false)
// const [userData,setUserData] =useState<any>({})


const handleSubmit = async (formdata:any):Promise<any>=>{

    const {name,email,Address,ph_no,Education} = formdata

    try{
        if(!name || !email || !Address  || !ph_no || !Education){
            let err:any= validate(formdata);
            return setFormError({err})
        }
   
        // formdata.UpdatedAt = Date.now();
    
        
        await axios.put('http://localhost:3004/my_data/1',formdata)

        setIsUpdated(true)

        // setDetails([formdata]);
        setIsEdit(!isEdit);

//   console.log("update axios data",data)


    
    // console.log("handle submit form data", !Object.keys(formdata === '') )

    }catch(err:any){
        if(err.code ==="ERR_NETWORK"){
            setError("Server connection failed.")
        }
        if(err.code === 'ERR_BAD_REQUEST'){
            
            setError("Bad request.Can't found resources.")
        }else{
        setError(err.message)

        }
        // console.log(err)

    }
   


       


// console.log("form error",formError)
}
// let FormError={}
const validate = (values:any) =>{

    if(!values.name){
        formError.name = "Name is Required"
    }

    if(!values.email){
        formError.email = "Email is Required"
    }
    if(!values.ph_no){
        formError.phone = "Phone is Required"
    }
    if(!values.Address){
        formError.Address = "Address is Required"
    }
    if(!values.Education){
        formError.Education = "Education is Required"
    }

    // return formError;


}




useEffect(():void => {

    const fetchPost = async () => {
        try{
            
        if(!local_data || isUpdated ){

        const {data} =   await axios.get("http://localhost:3004/my_data");

    
        console.log("url fetched ------>>>>>>")

            console.log('updated response data ------>>>>',{data})
            // setDetails(data)


            setIsloading(false)
            localStorage.setItem("my_data", JSON.stringify(data));

            




            console.log("updated","isUpdated --->>>" ,isUpdated)


                setDetails(data)
                setError(null)
                setIsloading(false)
                setIsUpdated(false)


        }

        else{
            console.log("not updated","isUpdated --->>>",isUpdated)
              console.log("url not fetched ------>>>>>>")

        }

            setIsloading(false)




        }catch(err:any){
            if(err.code ==="ERR_NETWORK"){
                setError("Server connection failed.")
            }
            if(err.code === 'ERR_BAD_REQUEST'){
                
                setError("Bad request.Can't found resources.")
            }else{
            setError(err.message)

            }
            console.log(err)
            // setError(err.message)
            setIsloading(false)
     

        }

    }

    fetchPost();
}, [isUpdated])


// console.log(details )
// let name = data.name

    return (

    <div >


        { !isLoading && error && <div className='server-error'> {error} </div>}


       { isLoading  && <Loading/>}
       

       { !isLoading && details.length > 0 &&
        <div className='home'>

        <h4>Welcome</h4>

         
         <div className={!isEdit ? 'home-container' :'edit-container'}>
            

         {!isLoading && !isEdit &&
  
          <div className='home-content-wrapper'>
              <h2>BIO</h2>
  
          <div className='home-content' >
              <label>Name :</label>
              <span> {details[0].name}</span>  
  
          </div>
          <div className='home-content' >
              <label>email : </label>
              <span> {details[0].email }</span> 
  
          </div>
          <div className='home-content' >
              <label>Phone :</label>
              <span> {details[0].ph_no}</span> 
              
          </div>
          <div className='home-content' >
              <label>Address :</label>
              <span>{details[0].Address}</span> 
          </div>
          <div className='home-content' >
              <label>Ed :</label>
              <span> {details[0].Education }</span> 
  
          </div>
          <div className='edit-btn' >
              <button type='submit' onClick={()=>setIsEdit(!isEdit)} >Edit</button>
          </div>
  
       
          </div>}
  
        
          {isEdit && !isLoading &&  details.length>0 && details.map((data:Idata) =>
              <Edit data={data} key={data.id} title={"Edit page"} formError={formError} handleSubmit={handleSubmit}/>)}
  
        
          </div>
          </div>

          
       }
        
    </div>
    )
}

export default Home;