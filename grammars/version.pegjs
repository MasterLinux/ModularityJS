/*
 * Version Grammar
 * ===============
 *
 * Grammar used to generate a parser used to parse version numbers
 */

{
    function parseDigits(digits) {
        return parseInt(digits.join(""), 10)
    }
}

start =
    version

version =
    major:integer

    // try to get optional minor and maintenance version number
    optionals:(
        "." minor:integer

        // try to get optional maintenance version number
        maintenance:(
            "." maintenance:integer
            {
                return maintenance;
            }
        )?
        {
            return {
                minor: minor,
                maintenance: maintenance
            };
        }
    )?
    {
        optionals = optionals || {};

        return {
            major: major,
            minor: optionals.minor || 0,
            maintenance: optionals.maintenance || 0
        };
    }

integer =
    digits:[0-9]+
    {
        return parseDigits(digits);
    }
