// import { exit } from 'process'
import React,{useState} from 'react'
import  './home/home.css'


type Props = {}

const Loading = (props: Props) => {

    let [width,setWidth]=useState<number>(0)

    // let p_width:number =100;

    // let total_Time:number = 10000;
    // let [cur_time,setTime]=useState<number>(0);

    const frame =()=>{
      
        if(width >= 100){
            setWidth (0) 
            clearInterval(id)
            // setTime(0)

            

        }else{
            //  width = width+20;
            width+=10;
            // setTime(cur_time)

            // width = ((cur_time))
            // console.log(width)
        
                
            // }
            setWidth(width)

            // return width;
        }

    }

    const id =setInterval(frame,1000);






  return (
    <div className='loading'>
        <div className='loading-1st-div'>
        <div className='loading-2nd-div ' style={{width:`${width}%`} } >

            </div>
            {width} %Loading.....

        </div>
       

    </div>
  )
}

export default Loading