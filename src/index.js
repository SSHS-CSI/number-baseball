import "regenerator-runtime/runtime";
import Peer from "peerjs";
import fromEmitter from "@async-generators/from-emitter";

let peer = new Peer();
let id;
let conn;

peer.on("open", _id => {
    id = _id;
});

peer.on("connection", _conn => {
    conn = _conn;
});

function getId() {
    return new Promise((resolve, _reject) => {
        if (id) {
            resolve(id);
        }
        peer.on("open", id => {
            resolve(id);
        });
    });
}

function getConnection() {
    return new Promise((resolve, _reject) => {
        if (conn) {
            resolve(conn);
        }
        peer.on("connection", conn => {
            resolve(conn);
        });
    });
}

connect.onclick = async () => {
    let conn = peer.connect(connectid.value);
    conn.on("open", () => {
        conn.send("Opened!");
    });
    send.onclick = () => {
        conn.send(input.value);
    };

    let dataSource = fromEmitter(conn, {
        onNext: "data",
        onDone: "close",
        onError: "error"
    });

    for await (let data of dataSource) {
        output.innerText = data;
    }
};

newgame.onclick = async () => {
    myid.innerText = await getId();
    let conn = await getConnection();
    send.onclick = () => {
        conn.send(input.value);
    };

    let dataSource = fromEmitter(conn, {
        onNext: "data",
        onDone: "close",
        onError: "error"
    });

    for await (let data of dataSource) {
        output.innerText = data;
    }
};
