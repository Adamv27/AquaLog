interface NitrogenLog {
  user_id: string,
  utc_time: string,
  ammonia: number,
  nitrites: number,
  nitrates: number,
}


class NitrogenLogModel implements NitrogenLog {
  user_id: string;
  utc_time: string;
  ammonia: number;
  nitrites: number;
  nitrates: number;
  constructor(user_id: string, utc_time: string, ammonia: number, nitrites: number, nitrates:number) {
    this.user_id = user_id;
    this.utc_time = utc_time;
    this.ammonia = ammonia;
    this.nitrites = nitrites;
    this.nitrates = nitrates;
  }

  static createFromArray = (row: any): NitrogenLogModel => {
    const [user_id, utc_time, ammonia, nitrites, nitrates] = row;
    return new NitrogenLogModel(user_id, user_id, ammonia, nitrites, nitrates)
  }
}

export default NitrogenLogModel;




