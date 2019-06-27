document.addEventListener('DOMContentLoaded', event => {

    const runBtn = document.getElementById('run-btn');
    const codeResultContainer = document.getElementById('code-output');
    const codeResultErr = document.getElementById('code-output');

    runBtn.addEventListener('click', e => {
        codeResultContainer.innerText = '';
        console['log'] = function (e) {
            codeResultErr.style.color = 'white';
            codeResultContainer.innerText += `${e}\n`
        };
        console['error'] = function (e) {
            codeResultErr.style.color = 'red';
            codeResultErr.innerText += `${e}\n`
        };
        try {
            eval(editor.getValue());
        } catch (err) {
            console.error(err);
        }
    });


    // editor.getSession().on('change', function(e) {
    //     console.log(editor.commands.commands.findAll);
    // });
    //
    // const articles = document.querySelectorAll('article');
    //
    // post.addEventListener('submit', async e => {
    //     e.preventDefault();
    //     const input = document.querySelector('.add-post');
    //
    //     let res = await fetch('/posts', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ text: input.value })
    //     });
    //
    //     const answer = await res.json();
    //     const postContainer = document.querySelector('.post-container');
    //     postContainer.innerHTML += `
    //     <article id="${answer._id}">
    //     <form method="post" action='/posts/${answer._id}/vote' class="inline">
    //     <button type="submit" name="submit_param" value="submit_value" class="fa fa-sort-desc vote-button upvote-button"></button>
    //     </form>
    //     <h2><a href='/posts/{{this._id}}'>${answer.title}</a></h2>
    //     <p>
    //     <span class='points'>${0}</span>
    //     <span class='username'>${answer.username}</span>
    //     <span class='timestamp'>${answer.timeSinceCreation}</span>
    //     <span class='comment-count'>${answer.commentCount}</span>
    //     <a class="delete" href='/${answer._id}'></a>
    //     </p>
    //     </article>`;
    //
    //
    //     const newArticle = document.getElementById(answer._id);
    //     addHandlers(newArticle);
    //     input.value = '';
    // });
    //
    // addHandlers = (el) => {
    //     const button = el.querySelector('.vote-button');
    //     const points = el.getElementsByClassName('points')[0];
    //     const deleted = el.getElementsByClassName('delete')[0];
    //
    //     button.addEventListener('click', async e => {
    //         e.preventDefault();
    //         let res = await fetch(`/posts/${el.id}/vote`, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //             },
    //         });
    //
    //         let answer = await res.json();
    //         points.innerHTML = answer.length;
    //         button.style.color = 'red';
    //     });
    //
    //     deleted.addEventListener('click', async delEl => {
    //         console.log('delEl>>>>>>>>>>>', delEl.target.href);
    //         delEl.preventDefault();
    //         await fetch(`/${delEl._id}`, { // надо вытащить ID
    //             method: 'DELETE',
    //         });
    //         delEl.remove();
    //     });
    // };
    //
    //
    // articles.forEach(el => {
    //     addHandlers(el)
    // });

});

