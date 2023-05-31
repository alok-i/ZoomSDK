import { headers } from 'next/dist/client/components/headers';

const KJUR = require('jsrsasign');
const ZOOM = require('../../../Constants/Zoom');

export default function handler(req, res)
{
    const iat = Math.round(new Date().getTime()  / 1000) - 30;
    const exp = iat + 60 * 60* 2;

    const Header = {
        alg:'HS256',
        typ:'JWT'
    };
    const Payload = {
       sdkKey: "QwW7fGkiB1z3IHvaq2xCVwtDARhcUyNGFALT",
       mn:req.body.meetingNumber,
       role:req.body.role,
       iat:iat,
       exp:exp
    };
    const sHeader = JSON.stringify(Header);
    const sPayload = JSON.stringify(Payload);

    const meetingSignature =KJUR.KJUR.jws.JWS.sign('HS256' , sHeader , sPayload , "YFBzpCIJS4d0Og45MLPG8r0AgXORfnlnTE2F");

    return res.json({
        signature : meetingSignature,
        sdkKey : "QwW7fGkiB1z3IHvaq2xCVwtDARhcUyNGFALT"
    })

}