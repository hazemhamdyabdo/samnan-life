export const useStatus = () => {
  function getStatus(status: string) {
    if (status === "completed") return "success";
    else if (status === "canceled") return "error";
    else return "warning";
  }
  return getStatus;
};
