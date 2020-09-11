import Peer from "peerjs";

let conn;

connect.onclick = () => {
    conn = peer.connect(connectid.value);
    conn.on("open", () => {
        conn.send("Opened!");
    });
    send.onclick = () => {
        conn.send(input.value);
    };
};

let peer = new Peer();

peer.on("open", id => {
    myid.innerText = id;
});

peer.on("connection", conn => {
    console.log("peer.on(connection)");
    console.log(conn);
    conn.on("data", data => {
        console.log(data);
        output.innerText = data;
    });
});
