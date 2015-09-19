/*
 * Version Grammar
 * ===============
 *
 * Grammar used to generate a parser used to parse author strings
 * in the following format:
 *      Max Mustermann<max.mustermann@mail.de>
 */

start =
    author

author =
    _ name:name _ optional_email:(
        email_start email:email email_end { return email; }
    )?
    {
        return {
            name: name,
            email: optional_email || null
        }
    }

name =
    name:name_character+
    {
        return name.join("");
    }

name_character =
    $(!(_ "<" / ">") .)

email =
    email:email_character+
    {
        return email.join("");
    }

email_character =
    $(!(email_end / whitespace) .)

email_start =
    "<" _

email_end =
    _ ">" _ EOF

EOF =
    !.

_ =
   whitespace*

whitespace "whitespace"
  = "\t"
  / "\v"
  / "\f"
  / " "
  / "\u00A0"
  / "\uFEFF"
