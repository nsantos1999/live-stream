const NodeMediaServer = require("node-media-server");

const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    mediaroot: "./server/media",
    allow_origin: "*",
  },
  trans: {
    ffmpeg: "/usr/local/bin/ffmpeg",
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
      },
    ],
  },
};

var nms = new NodeMediaServer(config);

nms.on("prePublish", async (id, StreamPath, args) => {
  let stream_key = getStreamKeyFromStreamPath(StreamPath);
  const session = nms.getSession(id);

  console.log(session);
  // console.log(stream_key);
  console.log(
    "[NodeEvent on prePublish]",
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});
const getStreamKeyFromStreamPath = (path) => {
  let parts = path.split("/");
  return parts[parts.length - 1];
};

nms.run();
