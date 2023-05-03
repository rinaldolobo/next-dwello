import { parseISO, format } from "date-fns";

const CustomDate = ({ dateString }) => {
  const date = new Date(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};

export default CustomDate;
