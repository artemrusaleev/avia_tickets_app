import uniqueid from "uniqid";

export function getId() {
  const id = uniqueid.time("avia", "id");
  return id;
}
