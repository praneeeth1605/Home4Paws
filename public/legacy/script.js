// SCRIPT / WEBSITE FUNCTIONALITY

let petsData=[
{
    id:1,
    name:"Buddy",
    type:"Dog",
    breed:"Golden Retriever",
    age:"2 Years",
    location:"Vijayawada",
    image:"images/dog1.jpg",
    health:"Healthy and vaccinated."
},
{
    id:2,
    name:"Rocky",
    type:"Dog",
    breed:"Labrador",
    age:"3 Years",
    location:"Hyderabad",
    image:"images/dog2.jpg",
    health:"Healthy and playful."
},
{
    id:3,
    name:"Max",
    type:"Dog",
    breed:"Beagle",
    age:"1 Year",
    location:"Guntur",
    image:"images/dog3.avif",
    health:"Friendly and healthy."
},
{
    id:4,
    name:"Luna",
    type:"Cat",
    breed:"Persian Cat",
    age:"2 Years",
    location:"Chennai",
    image:"images/cat1.webp",
    health:"Calm and vaccinated."
},
{
    id:5,
    name:"Coco",
    type:"Other",
    breed:"Rabbit",
    age:"8 Months",
    location:"Bengaluru",
    image:"images/rabbit1.jpg",
    health:"Healthy and gentle."
},
{
    id:6,
    name:"Hope",
    type:"Special Needs",
    breed:"Indie Dog",
    age:"4 Years",
    location:"Tenali",
    image:"images/specialdog.jpeg",
    health:"Needs extra care."
},
{
    id:7,
    name:"Milo",
    type:"Cat",
    breed:"Cute Cat",
    age:"1 Year",
    location:"Vijayawada",
    image:"images/cat2.jpg",
    health:"Healthy and friendly."
}
];

let pets=JSON.parse(localStorage.getItem("pets"))||petsData;
localStorage.setItem("pets",JSON.stringify(pets));

/* SIGNUP */

let sf=document.getElementById("signupForm");
if(sf){
    sf.onsubmit=function(e){
        e.preventDefault();
        let users=JSON.parse(localStorage.getItem("users"))||[];
        let name=document.getElementById("name").value.trim();
        let email=document.getElementById("email").value.trim().toLowerCase();
        let password=document.getElementById("password").value;

        if(users.some(x=>x.email.toLowerCase()==email)){
            alert("An account with this email already exists.");
            return;
        }

        users.push({
            name:name,
            email:email,
            password:password
        });

        localStorage.setItem("users",JSON.stringify(users));
        alert("Account created successfully!");
        location="login.html";
    };
}

/* LOGIN */

let lf=document.getElementById("loginForm");

if(lf){
    lf.onsubmit=function(e){
        e.preventDefault();

        let users=JSON.parse(localStorage.getItem("users"))||[];

        let email=document.getElementById("email").value.trim().toLowerCase();
        let password=document.getElementById("password").value;

        let u=users.find(x=>
            x.email==email && x.password==password
        );

        if(u){
            localStorage.setItem("user",JSON.stringify(u));
            location="pets.html";
        }else{
            document.getElementById("message").innerText=
            "Invalid login";
        }
    };
}

/* SHOW PETS */

function showPets(){
    let list=document.getElementById("petList");
    if(!list)return;
    let s=document.getElementById("search")
        .value.toLowerCase();
    let type=document.getElementById("filter").value;
    list.innerHTML="";
    pets.filter(p=>
        (type=="All"||p.type==type) &&
        (
            p.name.toLowerCase().includes(s) ||
            p.breed.toLowerCase().includes(s)
        )
    ).forEach(p=>{
        list.innerHTML+=`
        <div class="pet-card">
            <img src="${p.image}">
            <h2>${p.name}</h2>
            <p>${p.breed} • ${p.age}</p>
            <p>📍 ${p.location}</p>
            <p>${p.health}</p>
            <a class="btn"
               href="details.html?id=${p.id}">
               Details
            </a>
        </div>
        `;
    });
}

/* PET DETAILS */

function showDetails(){
    let id=new URLSearchParams(location.search).get("id");
    let p=pets.find(x=>x.id==id);
    if(!p)return;

    document.getElementById("petDetails").innerHTML=`
        <img src="${p.image}">
        <div>
            <h1>${p.name}</h1>
            <h3>${p.breed}</h3>
            <p>Type: ${p.type}</p>
            <p>Age: ${p.age}</p>
            <p>Location: ${p.location}</p>
            <p>${p.health}</p>
            <a class="btn"
               href="apply.html?id=${p.id}">
               Adopt Me
            </a>
        </div>
    `;
}

/* APPLICATION */

function loadApplication(){
    let id=new URLSearchParams(location.search).get("id");
    let p=pets.find(x=>x.id==id);
    if(!p)return;

    document.getElementById("petName").innerText=
    "Apply for "+p.name;

    document.getElementById("adoptionForm").onsubmit=
    function(e){
        e.preventDefault();

        let user=JSON.parse(localStorage.getItem("user"));

        if(!user){
            location="login.html";
            return;
        }

        let requests=
        JSON.parse(localStorage.getItem("requests"))||[];

        requests.push({
            id:Date.now(),
            petId:p.id,
            pet:p.name,
            user:user.name,
            email:user.email,
            phone:document.getElementById("phone").value.trim(),
            reason:document.getElementById("reason").value.trim(),
            date:new Date().toLocaleString(),
            status:"Pending"
        });

        localStorage.setItem(
            "requests",
            JSON.stringify(requests)
        );

        document.getElementById("message").innerText=
        "Application submitted successfully!";

        document.getElementById("adoptionForm").reset();
    };
}

/* USER REQUESTS */

function showRequests(){
    let user=JSON.parse(localStorage.getItem("user"));

    if(!user){
        location="login.html";
        return;
    }

    let r=
    JSON.parse(localStorage.getItem("requests"))||[];

    let box=document.getElementById("requests");

    if(!box)return;
    box.innerHTML="";
    let mine=r.filter(x=>x.email==user.email);

    if(mine.length==0){
        box.innerHTML=`
            <div class="empty-state">
                <h2>No adoption requests yet</h2>
                <p>
                    Apply for a pet and your request status
                    will appear here.
                </p>
            </div>
        `;
        return;
    }

    mine.sort((a,b)=>
        (b.id||0)-(a.id||0)
    );

    mine.forEach(x=>{
        let adminResponse="";

        if(x.adminReason){
            adminResponse=`
                <div class="admin-response
                    ${x.status=="Rejected"
                    ? "rejected-response"
                    : "approved-response"}">
                    <strong>Admin Response</strong>
                    <p>${x.adminReason}</p>
                </div>
            `;
        }

        box.innerHTML+=`
        <div class="request user-request-card">
            <div class="request-top">
                <div>
                    <p class="request-label">
                        ADOPTION REQUEST
                    </p>
                    <h2>${x.pet}</h2>
                </div>
                <span class="status-badge
                    ${requestStatusClass(x.status)}">
                    ${x.status}
                </span>
            </div>
            <p>
                <strong>Applicant:</strong>
                ${x.user}
            </p>
            <p>
                <strong>Reason:</strong>
                ${x.reason}
            </p>
            <p>
                <strong>Submitted:</strong>
                ${x.date || "Recently"}
            </p>
            ${adminResponse}
        </div>
        `;
    });
}

/* LOGOUT */

function logout(){
    localStorage.removeItem("user");
    location="login.html";
}

/* ADMIN REGISTRATION */

const COMMON_ADMIN_PASSWORD = "Home4paws";

let arf=document.getElementById("adminRegisterForm");

if(arf){
    arf.onsubmit=function(e){
        e.preventDefault();

        let name=document.getElementById("adminName").value.trim();
        let username=document.getElementById("adminUsername").value.trim();
        let email=document.getElementById("adminEmail").value.trim().toLowerCase();
        let commonPassword=document.getElementById("commonAdminPassword").value;
        let password=document.getElementById("adminPassword").value;
        let confirmPassword=document.getElementById("adminConfirmPassword").value;

        if(commonPassword !== COMMON_ADMIN_PASSWORD){
            document.getElementById("adminRegisterMessage").innerText=
            "Incorrect common registration password.";
            return;
        }

        if(password !== confirmPassword){
            document.getElementById("adminRegisterMessage").innerText=
            "Passwords do not match.";
            return;
        }

        if(!name || !username || !email || !password){
            document.getElementById("adminRegisterMessage").innerText=
            "Please fill all fields.";
            return;
        }

        let admins=JSON.parse(localStorage.getItem("admins")) || [];

        if(admins.some(x=>
            x.username &&
            x.username.toLowerCase()===username.toLowerCase()
        )){
            document.getElementById("adminRegisterMessage").innerText=
            "Username already exists.";
            return;
        }

        if(admins.some(x=>
            x.email &&
            x.email.toLowerCase()===email
        )){
            document.getElementById("adminRegisterMessage").innerText=
            "An admin with this email already exists.";
            return;
        }

        admins.push({
            name:name,
            username:username,
            email:email,
            password:password
        });

        localStorage.setItem("admins",JSON.stringify(admins));

        alert("Admin registration successful!");
        location="admin-login.html";
    };
}

/* ADMIN LOGIN */

let af=document.getElementById("adminForm");

if(af){
    af.onsubmit=function(e){
        e.preventDefault();

        let username=document.getElementById("adminUser").value.trim();
        let password=document.getElementById("adminPass").value;

        let admins=JSON.parse(localStorage.getItem("admins")) || [];

        let admin=admins.find(x=>
            x.username &&
            x.username.toLowerCase()===username.toLowerCase() &&
            x.password===password
        );

        if(admin){
            localStorage.setItem("admin",JSON.stringify(admin));
            location="admin.html";
        }else{
            document.getElementById("message").innerText=
            "Invalid username or password.";
        }
    };
}

/* ADMIN DASHBOARD */

function loadAdmin(){
    let adminData=localStorage.getItem("admin");

    if(!adminData){
        location="admin-login.html";
        return;
    }

    let admin=null;

    try{
        admin=JSON.parse(adminData);
    }catch(e){
        localStorage.removeItem("admin");
        location="admin-login.html";
        return;
    }

    let welcome=document.getElementById("adminWelcome");

    if(welcome && admin){
        welcome.innerText=
        "Welcome, "+admin.name+"!";
    }

    showAdminPets();
    showAdminRequests();
}

/* ADD / EDIT PET */

let editId=null;

function savePet(){
    let file=document.getElementById("petImage").files[0];

    if(!file){
        alert("Please select an image");
        return;
    }

    let reader=new FileReader();

    reader.onload=function(){
        let p={
            id:editId||Date.now(),
            name:document.getElementById("petNameInput").value,
            breed:document.getElementById("petBreed").value,
            type:document.getElementById("petType").value,
            age:document.getElementById("petAge").value,
            location:document.getElementById("petLocation").value,
            image:reader.result,
            health:document.getElementById("petHealth").value
        };

        if(editId){
            let i=pets.findIndex(x=>x.id==editId);
            pets[i]=p;
            editId=null;
        }else{
            pets.push(p);
        }

        localStorage.setItem("pets",JSON.stringify(pets));
        showAdminPets();
        alert("Pet saved!");
    };

    reader.readAsDataURL(file);
}

/* ADMIN PETS */

function showAdminPets(){
    let box=document.getElementById("adminPets");

    if(!box)return;

    box.innerHTML="";

    pets.forEach(p=>{
        box.innerHTML+=`
        <div class="admin-card">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>${p.breed}</p>
            <button class="btn edit"
                    onclick="editPet(${p.id})">
                Edit
            </button>
            <button class="btn delete"
                    onclick="deletePet(${p.id})">
                    Delete
            </button>
        </div>
        `;
    });
}

/* EDIT PET */

function editPet(id){
    let p=pets.find(x=>x.id==id);

    editId=id;

    document.getElementById("petNameInput").value=p.name;
    document.getElementById("petBreed").value=p.breed;
    document.getElementById("petType").value=p.type;
    document.getElementById("petAge").value=p.age;
    document.getElementById("petLocation").value=p.location;
    document.getElementById("petImage").value=p.image;
    document.getElementById("petHealth").value=p.health;

    window.scrollTo(0,0);
}

/* DELETE PET */

function deletePet(id){
    pets=pets.filter(p=>p.id!=id);

    localStorage.setItem(
        "pets",
        JSON.stringify(pets)
    );

    showAdminPets();
}

/* ADMIN REQUESTS */

function getRequests(){
    let requests=[];

    try{
        requests=JSON.parse(
            localStorage.getItem("requests")
        ) || [];
    }catch(e){
        requests=[];
    }

    if(!Array.isArray(requests)){
        requests=[];
    }

    /*
       Older versions used "New", "New Requests", or no status
       for applications that had not been reviewed. Treat all of
       those as Pending so every undecided request appears together.
    */
    let changed=false;

    requests=requests.map(x=>{
        let oldStatus=(x.status || "").toString().trim().toLowerCase();
        let status="Pending";

        if(oldStatus==="approved"){
            status="Approved";
        }else if(oldStatus==="rejected"){
            status="Rejected";
        }

        if(x.status!==status){
            changed=true;
        }

        return {
            ...x,
            status:status
        };
    });

    if(changed){
        localStorage.setItem(
            "requests",
            JSON.stringify(requests)
        );
    }

    return requests;
}

/* STATUS COLORS */

function requestStatusClass(status){
    if(status==="Approved")
        return "approved";

    if(status==="Rejected")
        return "rejected";

    return "pending";
}

/* REQUEST CARD */

function renderRequestCard(x,i){
    return `
        <div class="request admin-request-card">
            <div class="request-top">
                <div>
                    <p class="request-label">PET</p>
                    <h2>${x.pet || "Pet"}</h2>
                </div>

                <span class="status-badge ${requestStatusClass(x.status)}">
                    ${x.status}
                </span>
            </div>

            <div class="request-info">
                <div>
                    <span>Applicant</span>
                    <b>${x.user || "Not provided"}</b>
                </div>
                <div>
                    <span>Email</span>
                    <b>${x.email || "Not provided"}</b>
                </div>
                <div>
                    <span>Phone</span>
                    <b>${x.phone || "Not provided"}</b>
                </div>
                <div>
                    <span>Submitted</span>
                    <b>${x.date || "Recently"}</b>
                </div>
            </div>

            <div class="reason-box">
                <span>Reason for adoption</span>
                <p>${x.reason || "No reason provided."}</p>
            </div>

            ${
                x.adminReason
                ? `
                    <div class="admin-response ${x.status==="Rejected" ? "rejected-response" : "approved-response"}">
                        <strong>Admin Response</strong>
                        <p>${x.adminReason}</p>
                    </div>
                `
                : ""
            }

            ${x.status==="Pending" ? `
                <div class="request-actions">
                    <button
                        type="button"
                        class="btn approve"
                        onclick="changeStatus(${i},'Approved')">
                        Accept
                    </button>
                    <button
                        type="button"
                        class="btn delete"
                        onclick="rejectRequest(${i})">
                        Reject
                    </button>
                </div>
            ` : ""}
        </div>
    `;
}

/* SHOW ONLY PENDING REQUESTS ON ADMIN DASHBOARD */

function showAdminRequests(){
    let box=document.getElementById("adminRequests");
    if(!box)return;

    let r=getRequests();
    let pending=r
        .map((request,index)=>({...request,index}))
        .filter(x=>x.status==="Pending")
        .sort((a,b)=>(b.id||0)-(a.id||0));

    box.innerHTML="";

    if(pending.length===0){
        box.innerHTML=`
            <div class="empty-state">
                <h3>No pending adoption requests</h3>
                <p>New applications will appear here until you accept or reject them.</p>
            </div>
        `;
        return;
    }

    pending.forEach(x=>{
        box.innerHTML+=renderRequestCard(x,x.index);
    });
}

/* ADMIN REQUEST PAGE TABS */

let activeAdminRequestTab="Pending";

function switchAdminRequestTab(status){
    if(!["Pending","Approved","Rejected"].includes(status)){
        return;
    }

    activeAdminRequestTab=status;
    loadAdminRequestsPage();
}

function loadAdminRequestsPage(){
    if(!localStorage.getItem("admin")){
        location="admin-login.html";
        return;
    }

    let r=getRequests();

    let counts={
        Pending:r.filter(x=>x.status==="Pending").length,
        Approved:r.filter(x=>x.status==="Approved").length,
        Rejected:r.filter(x=>x.status==="Rejected").length
    };

    ["Pending","Approved","Rejected"].forEach(status=>{
        let countBox=document.getElementById(
            status.toLowerCase()+"Count"
        );
        if(countBox){
            countBox.innerText=counts[status];
        }

        let tab=document.getElementById(
            "tab"+status
        );
        if(tab){
            tab.classList.toggle(
                "active",
                activeAdminRequestTab===status
            );
            tab.setAttribute(
                "aria-selected",
                activeAdminRequestTab===status ? "true" : "false"
            );
        }
    });

    let box=document.getElementById("adminRequestsPage");
    if(!box)return;

    let selected=r
        .map((request,index)=>({...request,index}))
        .filter(x=>x.status===activeAdminRequestTab)
        .sort((a,b)=>(b.id||0)-(a.id||0));

    box.innerHTML="";

    if(selected.length===0){
        let message=activeAdminRequestTab==="Pending"
            ? "New applications will appear here until you accept or reject them."
            : `Requests you have ${activeAdminRequestTab.toLowerCase()} will appear here.`;

        box.innerHTML=`
            <div class="empty-state">
                <h2>No ${activeAdminRequestTab.toLowerCase()} requests</h2>
                <p>${message}</p>
            </div>
        `;
        return;
    }

    selected.forEach(x=>{
        box.innerHTML+=renderRequestCard(x,x.index);
    });
}

/* REJECT REQUEST */

function rejectRequest(i){
    let r=getRequests();

    if(!r[i] || r[i].status!=="Pending")return;

    let reason=prompt(
        "Enter the reason for rejecting this adoption request:"
    );

    if(reason===null){
        return;
    }

    reason=reason.trim();

    if(reason===""){
        alert("Please enter the reason for rejection.");
        return;
    }

    r[i].status="Rejected";
    r[i].adminReason=reason;
    r[i].decisionDate=new Date().toLocaleString();

    localStorage.setItem(
        "requests",
        JSON.stringify(r)
    );

    showAdminRequests();
    loadAdminRequestsPage();

    alert("Request rejected. The reason has been sent to the user.");
}

/* ACCEPT REQUEST */

function changeStatus(i,status){
    let r=getRequests();

    if(!r[i] || r[i].status!=="Pending")return;
    if(status!=="Approved")return;

    r[i].status="Approved";
    r[i].adminReason=
        "Your adoption request has been approved. Please contact the shelter for the next steps.";
    r[i].decisionDate=new Date().toLocaleString();

    localStorage.setItem(
        "requests",
        JSON.stringify(r)
    );

    showAdminRequests();
    loadAdminRequestsPage();
}

/* ADMIN LOGOUT */

function adminLogout(){
    localStorage.removeItem("admin");
    location="admin-login.html";
}

/* HOME SLIDER */

let photos=[
    "images/dog1.jpg",
    "images/dog2.jpg",
    "images/dog3.avif",
    "images/cat1.webp",
    "images/cat2.jpg"
];

let n=0;

let hero=document.getElementById("heroPet");

if(hero){
    setInterval(function(){
        n=(n+1)%photos.length;
        hero.src=photos[n];
    },3000);
}