const express = require('express');
const Model = require('../model/model');
const router = express.Router()
var ethers = require('ethers');
const abi = require('./abi.json');
const connection = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/', { name: 'binance', chainId: 97 });
const contractAddress = '0x42e102a153F5ec3152Ce6D76438A4e9678ADaC9A';
const privateKey = '0x4269969300577f1a1df73cd5dd549caadd293d064fcc613d0c44b60196796d84';
const gasPrice = connection.getGasPrice();
// var wallet = new ethers.Wallet(privateKey, connection);
// let readContract = new ethers.Contract(contractAddress, abi, connection);
// let contractSigner = readContract.connect(wallet);
// var contract = new ethers.Contract(contractAddress, abi, wallet);








//test
router.get('/createAddress', async (req, res) => {
    // All createRandom Wallets are generated from random mnemonics
    let wallet = ethers.Wallet.createRandom();

    const data = Promise.resolve(wallet)
    data.then(value => {
        result = value;
        res.status(200).json({ message: result })

    });
    console.log('wallet.address:', wallet.address)
    console.log('wallet.mnemonic.phrase:', wallet.mnemonic)
    console.log('wallet.privateKey:', wallet.privateKey)


})



//test
router.get('/check-balance', async (req, res) => {





})





//test
router.post('/transfer', async (req, res) => {



    var signer = new ethers.Wallet(req.body.private_Key, connection);



    const tx = {
        from: signer.address,
        to: req.body.recipient,
        value: ethers.utils.parseUnits(req.body.amt, "ether"),
        gasPrice: gasPrice,
        gasLimit: ethers.utils.hexlify(100000),
        nonce: connection.getTransactionCount(signer.address, "latest")
    }

    const transaction = await signer.sendTransaction(tx)
    const data = Promise.resolve(transaction)
    data.then(value => {

        res.status(200).json({ message: value })

    });

})


//test
router.post('/fund', async (req, res) => {
   const amt=ethers.utils.parseUnits("10",18)
    const tokenAbi = [
        "function balanceOf(address) view returns (uint)",
        "function transfer(address to, uint amount)"

    ];
    const tokenContract = new ethers.Contract(contractAddress, tokenAbi, connection);
    var signer = new ethers.Wallet(privateKey, connection);
    const txSigner= tokenContract.connect(signer);
    const transaction = await txSigner.transfer(req.body.address,amt)
    const data = Promise.resolve(transaction)
    data.then(value => {
       
        res.status(200).json({ Data: value })

    });

})



//test
router.post('/balance', async (req, res) => {
    const tokenAbi = [
        "function balanceOf(address) view returns (uint)"
    ];
    const tokenContract = new ethers.Contract(contractAddress, tokenAbi, connection);
    const transaction = await tokenContract.balanceOf(req.body.address)
    const data = Promise.resolve(transaction)
    data.then(value => {
        const result = ethers.utils.formatUnits(value, 18);
        res.status(200).json({ balance: result })

    });

})




//Get all Method
router.get('/read', async (req, res) => {

    var result = [];
    var sendPromise = await contract.balanceOf("0x5D61B9fc49332d5D3A47e5a0e7a1F067C910f07f");
    const data = Promise.resolve(sendPromise)
    data.then(value => {
        result = value.wait();
        res.status(200).json({ message: result })
        console.log(result);

    });


})




//test
router.post('/write', async (req, res) => {

    var result = [];
    var sendPromise = await contract.setValue(req.body.word);
    const data = Promise.resolve(sendPromise)
    data.then(value => {
        result = value;
        res.status(200).json({ message: result })

    });



})




























//Get all Method
router.get('/', async (req, res) => {

    res.send('Get All API')

})



//Post Method
router.post('/register', async (req, res) => {

    const data = new Model({
        email: req.body.email,
        password: req.body.password,
        isKYCDone: req.body.isKYCDone

    });

    try {

        const dataToSave = await data.save();

        res.json(dataToSave)


    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



//Post Method
router.post('/login', async (req, res) => {
    var { email, mpassword } = req.body;


    try {

        var user = await Model.findOne({ email });

        if (mpassword = user.password) {
            res.json(user)
        } else {
            res.status(400).json({ message: 'user authentication error' })
        }


    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})





//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;