import Web3 from 'web3';
import {recoverTypedSignature_v4} from 'eth-sig-util'
import axios from "axios";


export default async function testSign() {

    const {ethereum} = window;
    const web3 = window.web3 = new Web3(ethereum);
    await ethereum.enable();

    const msgParams = JSON.stringify({
        domain: {
            // Defining the chain aka Rinkeby testnet or Ethereum Main Net
            chainId: await web3.eth.getChainId(),
            // Give a user friendly name to the specific contract you are signing for.
            name: 'Entry Point Sign In',
            // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
            // Just let's you know the latest version. Definitely make sure the field name is correct.
            version: '1',
        },

        // Defining the message signing data content.
        message: {
            Message: 'Signing this message will allow Entry Point to verify that you are indeed the owner of this wallet.',
            //Timestamp: getCurrentTimestampUnix(),
            Note: 'This signature will not cost you any fees',
        },
        // Refers to the keys of the *types* object below.
        primaryType: 'SigninMessage',
        types: {
            // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
            EIP712Domain: [
                {name: 'name', type: 'string'},
                {name: 'version', type: 'string'},
                {name: 'chainId', type: 'uint256'},
                {name: 'verifyingContract', type: 'address'},
            ],
            SigninMessage: [
                {name: 'Message', type: 'string'},
                //{ name: 'Timestamp', type: 'uint256' },
                {name: 'Note', type: 'string'},
            ],
        },
    });

    var from = await web3.eth.getAccounts();
    web3.currentProvider.sendAsync(
        {
            method: 'eth_signTypedData_v4',
            params: [from[0], msgParams],
            from: from[0],
        },
        async function (err, result) {
            if (err) return console.dir(err);
            if (result.error) {
                alert(result.error.message);
            }
            if (result.error) return console.error('ERROR', result);
            console.log('TYPED SIGNED:' + JSON.stringify(result.result));
            console.log('params=', msgParams);

            let recovered = recoverTypedSignature_v4({
                data: JSON.parse(msgParams),
                sig: result.result,
            });

            console.log('recovered=', recovered)

            let response = await axios.post('/signin',
                {msgParams: msgParams, sig: result.result},
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );
            const accessToken = response.data.accessToken
            localStorage.setItem('accessToken', accessToken)
            console.log('accessToken', accessToken)
        }
    );
}

async function logout() {
    localStorage.removeItem('accessToken')
}

async function getProfile() {
    const accessToken = localStorage.getItem('accessToken')
    let response = await axios.get('http://localhost:8001/profile',
        {
            headers: {'Authorization': `Bearer ${accessToken}`}
        }
    );
    console.log('profile response', response)
}

