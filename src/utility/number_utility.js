/**
 * Created by Christoph on 07/06/2016.
 */

export function number(number) {
    return {
        isInRange: function (x1, x2, tolerance = 0) {
            return number + tolerance >= Math.min(x1, x2) &&
                number - tolerance <= Math.max(x1, x2);
        }
    };
}
