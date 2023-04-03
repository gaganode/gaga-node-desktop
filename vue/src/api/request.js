import axios from "axios";

async function Get(targetUrl,token=null){
    let config={}
    if (token!==null){
        config={
            headers: {
                Authorization: "Bearer " + token,
              },
        }
    }
    try {
        let response = await axios.get(targetUrl,config)
        return {
            err:null,
            result: response.data
        };
    } catch (error) {
        return {
            err:error.toString(),
            result: null
        }

    }
}

async function Post(targetUrl,body,token=null) {
    let config={}
    if (token!==null){
        config={
            headers: {
                Authorization: "Bearer " + token,
              },
        }
    }
    try {
        let response = await axios.post(targetUrl, body,config)
        return {
            err:null,
            result: response.data
        };
    } catch (error) {
        return {
            err:error.toString(),
            result: null
        }

    }
}

export default {
    Get,
    Post
}