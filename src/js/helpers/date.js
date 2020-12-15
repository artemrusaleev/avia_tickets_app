import { format } from "date-fns";
import { ru } from "date-fns/locale";

/**
 *
 * @param {String} str  - one string date
 * @param {String} type - 'yyyy.mm.dd'
 */
export function formatDate(str, type) {
  const date = new Date(str);

  return format(date, type, {
    locale: ru,
  });
}
