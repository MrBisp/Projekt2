var token = localStorage.getItem('token');
$.ajax({
    url: 'http://localhost:3000/user/userByToken/',
    type: "GET",
    beforeSend: function (request) {
        request.setRequestHeader("Authorization", 'Bearer ' + token);
    },
    success: function (result) {
        alert('Du er allerede logget ind');
        location.href = 'minSide.html';
    }
});