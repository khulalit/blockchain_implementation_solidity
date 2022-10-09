
let contract;
let window_loaded = false;
let web3;
window.onload = ()=>{
    // console.log(window.ethereum)
    web3 = new Web3(window.ethereum)
    let address = "0xD899523Cc1fbBC09A1E7B551eFF80d133b614721"
    // 0xC20c5B95aA4551940d130C4c8009450785155508
    // 0x357963147BAfd27c040E0a6130537B59d0DaC340
    let abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "course",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "course_id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "instructor_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "week_duration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "total_seats",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "remaining_seats",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "courseid",
                    "type": "uint256"
                }
            ],
            "name": "courseCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "instructor_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "week_duration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "total_seats",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "createCourse",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "enrol",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCurrentStudent",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getPriceOfCourse",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "list_of_course_id",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "list_of_course_name",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "list_of_courses_a_student_enrolled",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                }
            ],
            "name": "registerStudent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "students",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "isRegister",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    console.log(web3.eth)
    web3.eth.getGasPrice().then(console.log)
    contract = new web3.eth.Contract(abi,address);
    // console.log(window.location.href)
    if(window.location.href !== 'http://localhost:5500/' && window.location.href !== 'http://localhost:5500/index.html' && window.location.href !== 'http://localhost:5500/create_course.html') {
    contract.methods.list_of_course_name().call()
    .then(res=>{
        // document.querySelector('#leftseat').innerHTML = res
        //console.log(res)
        let id = [];
        contract.methods.list_of_course_id().call()
        .then(result=>{
            // console.log(result)
            result.forEach(value=>{
                id.push(value)
            })
            
        }).
        then(()=>{
            // console.log(id)
            for(let i = 0; i< res.length; i++){
                document.getElementById('course_list').innerHTML+= `<div class="card" style="width: 18rem;">
                <img class="card-img-top" src="https://via.placeholder.com/100x50" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${res[i]}</h5>
                    <span class="h5">Course ID - ${i}</span><br>
                    <button class="btn btn-success mt-2 buy" data-id="${i}"  onclick="buy_course(event)">Buy </button>
                </div>
                </div>`
            }
            id = []
        }).
        catch(err=>{
            alert("Can not retrive id..")
        })
    }).catch(err=>{
        alert("Something went wrong ")
    })
    
}}


// if(window_loaded)
function buy_course(e) {
    console.log(e.srcElement.dataset.id)
    let uid = parseInt(e.srcElement.dataset.id);
    contract.methods.getPriceOfCourse(uid).call().
    then(res=>{
        contract.methods.courseCount(uid).call().then(r => {
            console.log(r)
            if(confirm("Price of the course is : "+ res + "\nCourse has student count of "+r) == true)
            web3.eth.getAccounts().then(res=>{
                console.log(res)
                contract.methods.enrol(uid).send({
                    from : res[0],
                    gasPrice : 20000000000
                }).then(result=>{
                    console.log(result)
                })
            }).catch(err=>{
                alert('error')
            })
        })
        
    }).catch(err=>{
        console.log(err)
    })
    
}
function submithandler(e) {
    e.preventDefault();
    console.log(e.target[0].value)
    let email = e.target[0].value
    let name = e.target[1].value
    web3.eth.getAccounts().then(res=>{
        console.log(res)
        contract.methods.registerStudent(email,name).send({
            from : res[0]
        }).then(result=>{
            console.log(result)
        })
    }).catch(err=>{
        alert("error")
    })
}
function createCourseSubmitHandler(e){
    // console.log("working")
    e.preventDefault();
    console.log(e.target[0].value)
    let coursename = e.target[0].value
    let instructor_name = e.target[1].value
    let intake = e.target[2].value
    let duration = e.target[3].value
    let price = e.target[4].value
    web3.eth.getAccounts().then(res=>{
        console.log(res)
        contract.methods.createCourse(coursename,instructor_name,intake,duration,price).send({
            from : res[0]
        }).then(result=>{
            console.log(result)
            alert("course added")
        })
    }).catch(err=>{
        console.log(err.message)
    })
}
    