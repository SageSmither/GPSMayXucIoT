var socket = io.connect('localhost:5000');
socket.on('connect', function (data) {
  console.log('data: ', data);
  socket.on('join', (room) => console.log(room));
});

//listen thread event
socket.on('status', function (data) {
  console.log(data);
  const idEx = data.split(';')[0];
  const status = data.split(';')[1];
  const isCheck = !!Number(status);
  document.getElementById(idEx).checked = isCheck;
  if (isCheck) {
    document.getElementById(`lb${idEx}`).innerHTML = 'On';
  } else {
    document.getElementById(`lb${idEx}`).innerHTML = 'Off';
  }
});

function switchStatus(id) {
  if (document.getElementById(id).checked) {
    document.getElementById(`lb${id}`).innerHTML = 'On';
    socket.emit('status', `${id};1`);
  } else {
    document.getElementById(`lb${id}`).innerHTML = 'Off';
    socket.emit('status', `${id};0`);
  }
}
