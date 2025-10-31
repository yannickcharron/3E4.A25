import IOEVENTS from '../../io-events.js';


$(document).ready(() => {

    $('#btnSend').click(() => {
        
    });

    $('#txtMessage').keyup(e => {
       
    });

    $('#btnUpdateUsername').click(() => {
        
    })

});

//TODO: Réceptions des évenement


function createMessageUI(message, isFromMe) {
    let messageLi = '';

    if(isFromMe) {
        messageLi = 
            `<li class='chat-left'>
                <div class='chat-avatar'>
                <img src='' alt=''>
                <div class='chat-name'>NAME</div>
                </div>  
                <div class='chat-text'>TEXT</div>
                <div class='chat-hour'>TIME<span class='fa fa-check-circle'></span></div>
            </li>`;
    } else {
        messageLi = 
            `<li class='chat-right'>
                <div class='chat-hour'>TIME<span class='fa fa-check-circle'></span></div>
                <div class='chat-text'>TEXT</div>
                <div class='chat-avatar'>
                    <img src='' alt=''>
                    <div class='chat-name'>NAME</div>
                </div>
            </li>`
    }
   
    return messageLi;
}

function createUserUI(user){

    const userLi = 
        `<li class='person' data-chat='ID'>
            <div class='user'>
                <img src='' alt=''>
            </div>
            <p class='name-time'>
                <span class='name'>NAME</span>
            </p>
        </li>`;

    
    return userLi;

}


