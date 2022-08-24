export const getReadableTime: Function = (getMilliseconds: boolean): string => {
  // crate new date instance
  let date_instance: string = new Date().toISOString();
  const [date, time]: string[] = date_instance.split("T");
  // remove point from milliseconds
  const [formated_time, _]: string[] = time.split(".");
  if (getMilliseconds) return formated_time;
  const split_time = formated_time.split(":");
  const returned_time = `${split_time[0]}:${split_time[1]}`
  return returned_time;
}

export const getCurrentDate: Function = (): string => {
  // create new date instance
  let date_instace: string = new Date().toISOString();
  const [date, time]: string[] = date_instace.split("T");
  const split_date: string[] = date.split("-");
  const flipped_date: string = `${split_date[split_date.length - 1]}/${split_date[split_date.length - 2]}/${split_date[0]}`;
  return flipped_date;
}

