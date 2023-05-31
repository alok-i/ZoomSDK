import next from 'next';
import { useEffect } from 'react';
import MeetingStyles from "../styles/zoom.module.css";
import router from 'next/router';


const axios = require('axios');


const Meeting=()=>{
        useEffect(()=>{
             return async()=>{
                new Promise(async (resolve, reject)=>{
                    const ZoomEmbed = await (await import('@zoomus/websdk/embedded')).default;

                    let client  = ZoomEmbed.createClient();

                    resolve(ZoomEmbed.createClient());

                }).then(async(client) =>{
                    let meetingSDKELement = document.getElementById('meetingSDKElement');
                    client.init({
                        language : 'en-US',
                        zoomAppRoot :meetingSDKELement
                    });

                    let payload = router.query;


                    const {data} = await axios({
                        url: 'http://localhost:3000/api/Zoom',
                        method : 'post',
                        data : payload
                    }).then(response=>{
                         return response;
                    }).catch(error=>{
                        console.log("signature axios req err"  , error);
                    })

                     client.join({
                        meetingNumber : payload.meetingNumber,
                        signature : data.signature,
                        sdkKey : data.sdkKey,
                        userName : payload.userName,
                        password : payload.password
                     })
                }).catch(error=>{
                    console.log("error in Useeffect" , error);
                });
             }
        });
        return (
            <div className={MeetingStyles.container}>
                <div className={MeetingStyles.meetingSDKELement} id="meetingSDKElement"></div>
                <div className={MeetingStyles.content}>Content</div>
            </div>
        )
}

Meeting.displayName = "Zoom component view"

export default Meeting;