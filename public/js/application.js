document.addEventListener('DOMContentLoaded', event => {

    const runBtn = document.getElementById('run-btn');
    const codeResultContainer = document.getElementById('code-output');
    const inviteBtn = document.getElementById('inviteBtn');



    const inviteLinkField = document.getElementById('invite-link');

    const inviteAndCopyToCpbBtn = document.getElementById('copy-to-clpb');

    if (inviteBtn.classList[2] === 'disabled') inviteLinkField.value = 'you cant create invite link';
    else inviteLinkField.value = window.location.href + '/Crud123';

    runBtn.addEventListener('click', e => {
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
            eval(editor.getValue());
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

