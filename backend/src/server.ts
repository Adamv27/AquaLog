import app from "./app"
import NitrogenLogModel from "./models/nitrogenLog";
import { Client } from"ts-postgres";
import { Factory, createPool } from "generic-pool";
import config from "./config";


const dbConfig = {
  "host": config.HOST, 
  "port": config.POSTGRE_PORT,
  "user": config.USER,
  "password": config.PASSWORD,
  "database": config.DATABASE
}

const pool = createPool({
  create: async () => {
    const client = new Client(dbConfig);

    return client.connect().then(() => {
      client.on("error", console.log);
      return client;
    })
  },
  destroy: async (client: Client) => {
    return client.end().then(() => {})
  },
  validate: (client: Client) => {
    return Promise.resolve(!client.closed);
  }
}, { testOnBorrow: true });



const queryData = async () => {
  const client = await pool.acquire();
  try {
    const result = await client.query("SELECT * FROM nitrogen_logs");
    const logs: NitrogenLogModel[] = result.rows.map((row) => NitrogenLogModel.createFromArray(row)) 
    return logs;
  } finally {
    pool.release(client);
  }
}



const port = config.API_PORT;


app.get("/nitrogen-logs", async (req, res) => {
  const logs = await queryData();
  res.status(200).json(logs);
});


app.listen(port!, () => {
  console.log("Server running on port: " + port)
});

