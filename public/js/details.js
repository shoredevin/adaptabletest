const clickMeButton = document.getElementById('click-me');

clickMeButton.addEventListener('click', async function() {
    console.log('clicked');
    await fetch('/todos/details')
     .then((response) => response.json())
     .then((data) => {
        console.log(data)
     });
})