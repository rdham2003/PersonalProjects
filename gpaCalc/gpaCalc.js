document.getElementById('submit').onclick = function(){
    let cumulative_GPA = [];
    let technical_GPA = [];
    let credits = [];
    let tech_credits = [];
    for (let i = 1; i <= 8; i++){
        let selectedIndex = document.getElementById(`course${i}grade`).selectedIndex;
        console.log(`Selected index for course ${i}: ${selectedIndex}`);
        switch (selectedIndex){
            case 0:
                break;
            case 1:
                if (document.getElementById(`course${i}Tech`).checked){
                    technical_GPA.push(4);
                }
                cumulative_GPA.push(4);
                break;           
            case 2:
                if (document.getElementById(`course${i}Tech`).checked){
                    technical_GPA.push(3.667);
                }
                cumulative_GPA.push(3.667); 
                break;          
            case 3:
                if (document.getElementById(`course${i}Tech`).checked){
                    technical_GPA.push(3.333);
                }
                cumulative_GPA.push(3.333); 
                break;           
            case 4:
                if (document.getElementById(`course${i}Tech`).checked){
                    technical_GPA.push(3);
                }
                cumulative_GPA.push(3);    
                break;        
            case 5:
                if (document.getElementById(`course${i}Tech`).checked){
                    technical_GPA.push(2.667);
                }
                cumulative_GPA.push(2.667); 
                break;              
            case 6:
                if (document.getElementById(`course${i}Tech`).checked){
                    technical_GPA.push(2.333);
                }
                cumulative_GPA.push(2.333);
                break;            
            case 7:
                if (document.getElementById(`course${i}Tech`).checked){
                    technical_GPA.push(2);
                }
                cumulative_GPA.push(2); 
                break;          
            case 8:
                if (document.getElementById(`course${i}Tech`).checked){
                    technical_GPA.push(1.667);
                }
                cumulative_GPA.push(1.667); 
                break;            
            case 9:
                if (document.getElementById(`course${i}Tech`).checked){
                    technical_GPA.push(1.333);
                }
                cumulative_GPA.push(1.333);
                break;            
            case 10:
                if (document.getElementById(`course${i}Tech`).checked){
                    technical_GPA.push(1);
                }
                cumulative_GPA.push(1);
                break;            
            case 11:
                if (document.getElementById(`course${i}Tech`).checked){
                    technical_GPA.push(0);
                }
                cumulative_GPA.push(0); 
                break;             
            default:
                continue;      
        }
    }
    for (let i = 1; i <= 8; i++){
        let selectedIndex = document.getElementById(`course${i}credits`).selectedIndex;
        console.log(`Selected index for course ${i}: ${selectedIndex}`);
        switch (selectedIndex){
            case 0:
                break;
            case 1:
                if (document.getElementById(`course${i}Tech`).checked){
                    tech_credits.push(4)
                }
                credits.push(4);
                break;           
            case 2:
                if (document.getElementById(`course${i}Tech`).checked){
                    tech_credits.push(3)
                }
                credits.push(3); 
                break;          
            case 3:
                if (document.getElementById(`course${i}Tech`).checked){
                    tech_credits.push(2)
                }
                credits.push(2); 
                break;           
            case 4:
                if (document.getElementById(`course${i}Tech`).checked){
                    tech_credits.push(1);
                }
                credits.push(1) 
                break;             
            default:
                continue;      
        }
    } 
    console.log(cumulative_GPA)
    console.log(credits)
    console.log(technical_GPA)
    console.log(tech_credits)
    console.log(cumulativeGPA(cumulative_GPA,credits))
    console.log(techGPA(technical_GPA,tech_credits))
    setTimeout(function(){
        window.scrollBy(0,1500);
    },0);
    var gpaElements = document.querySelectorAll('.gpa');
        gpaElements.forEach(function (element) {
            element.style.visibility = 'visible';
        });
    document.getElementById("cumGPA").innerHTML = `Your Cumulative GPA this semester is: ${cumulativeGPA(cumulative_GPA,credits)}`
    document.getElementById("techGPA").innerHTML = `Your Technical GPA this semester is: ${techGPA(technical_GPA,tech_credits)}`
}

document.getElementById("reset").onclick = function(){
    for (let i = 1; i <= 8; i++){
        document.getElementById(`Course${i}`).value = ""
        document.getElementById(`course${i}grade`).selectedIndex = 0
        document.getElementById(`course${i}credits`).selectedIndex = 0
        document.getElementById(`course${i}Tech`).checked = false;
        document.getElementById('cumGPA').innerHTML = ""
        document.getElementById('techGPA').innerHTML = ""
    }
    var gpaElements = document.querySelectorAll('.gpa');
        gpaElements.forEach(function (element) {
            element.style.visibility = 'hidden';
        });
}
function cumulativeGPA(list,list2){
    let totalGPA = 0;
    let totalCred = 0;
    for (let i = 0; i < list.length; i++){
        totalGPA += list[i]*list2[i];
        totalCred += list2[i];
    }
    if (totalCred ==0)
        return 0;
    else
        return Math.round(totalGPA/totalCred*1000)/1000;
}

function techGPA(list,list2){
    let totalGPA = 0;
    let totalCred = 0;
    for (let i = 0; i < list.length; i++){
        totalGPA += list[i]*list2[i];
        totalCred += list2[i];
    }
    if (totalCred ==0)
        return 0;
    else
        return Math.round(totalGPA/totalCred*1000)/1000;
}
// for (let i = 0; i < 8; i++){
//     console.log(cumulative_GPA[i])
// }
