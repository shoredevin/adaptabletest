const lb = document.getElementById('login-button');

lb.onclick = async () => {
    const username = document.getElementById('uname').value;
    const password = document.getElementById('pwrd').value;
    // console.log(username, password)
    const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            'username': username,
            'password': password,
        }),
    });     
    const data = await response.json();
    if(data.res == "success") {
        window.location.replace("/dex");
        return;
    }
    showSnackBar(data.res);
    // console.log('logged in');

}