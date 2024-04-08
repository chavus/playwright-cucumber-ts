import * as dotenv from 'dotenv'
import { SUPPORTED_BROWSERS, type BrowserName } from '../../web-students-app/utils/browserManager'

const DEFAULT_BROWSER = SUPPORTED_BROWSERS[0]

/**
 * Configures test execution environment variables.
 * - Loads correct environment variables
 * - Verify browser variable to be suported and set a default if required.
 * 
 * To be executed right after test starts 
 */
export default  function testConfig(){

    const env = process.env.ENV?.toLowerCase() 
    if (env && env!='%npm_config_env%'){
        console.log(`Running on environment: ${env}`)
        dotenv.config({path:`.env.${env}`})    
    }else{
        console.log(`Running on default environment.`)
        // Loads local environment variables or .env if exists
        dotenv.config()
    }

    if (!process.env.BROWSER || process.env.BROWSER == '%npm_config_testBrowser%'){
        process.env.BROWSER = DEFAULT_BROWSER
    } else if (!SUPPORTED_BROWSERS.includes(process.env.BROWSER as BrowserName)){
        throw(`Browser: ${process.env.BROWSER} not supported. Select on of the following: ${SUPPORTED_BROWSERS}`)
    }
    console.log("Executing test on browser: ", process.env.BROWSER);


}