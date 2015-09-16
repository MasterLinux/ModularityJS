start
    = version

version
    = major:integer "." minor:integer "." maintenance:integer { return { major: major, minor: minor, maintenance: maintenance } }

integer
    = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
