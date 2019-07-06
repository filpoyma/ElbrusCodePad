document.addEventListener('DOMContentLoaded', event => {

    const runBtn = document.getElementById('run-btn');
    const codeResultContainer = document.getElementById('code-output');
    const inviteBtn = document.getElementById('inviteBtn');
    const inviteLinkField = document.getElementById('invite-link');
    const inviteAndCopyToCpbBtn = document.getElementById('copy-to-clpb');
    const socket = io.connect();
    //if (inviteBtn.classList[2] === 'disabled') inviteLinkField.value = 'you cant create invite link';
    const rndSymbs = Math.random().toString(36).substring(7);
    inviteLinkField.value = window.location.href + '/' + rndSymbs;

    runBtn.addEventListener('click', e => {

        socket.emit('send event', {
            event: editor.getValue(),
        });
    });

    socket.on('adds event', (data) => {
        codeResultContainer.innerText = '';
        console['log'] = function (e) {
            codeResultContainer.style.color = 'white';
            codeResultContainer.innerText += `${e}\n`
        };
        console['error'] = function (e) {
            codeResultContainer.style.color = 'red';
            codeResultContainer.innerText += `${e}\n`
        };
        try {
            eval(data.data);

        } catch (err) {
            console.error(err);
        }
    });

    inviteAndCopyToCpbBtn.addEventListener('click', async (e) => {
        console.log(inviteLinkField.value);
        inviteLinkField.select();
        document.execCommand("copy");
        //e.preventDefault();
        let res = await fetch('/interview/invitelink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({link: inviteLinkField.value})
        });

        //const answer = await res.json();
    });

    //     let res = await fetch('/posts', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({location: window.location.href})
    //     });
    // });
    // const answer = await res.json();


    // editor.getSession().on('change', function(e) {
    //     console.log(editor.commands.commands.findAll);
    // });
    //


});

