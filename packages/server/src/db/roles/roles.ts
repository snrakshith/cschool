// roles for super admin ( sa )

/**
 *  Can manage the operations of ( csh-360 ) portal & app
 *  Access to all the schools and the complete plateform
 */

const SA = "SUPER_ADMIN";
const EDITOR = "EDITOR";

// roles for cschool-360 ( csh-360 ) portal & app

/**
 *  Can manage day to day operations of their school via ( csh-360 )
 *  portal & app, access to their own school
 */

// Roles who have access to ( csh-360 ) portal & app
// with there respective login credentials

const roles = {
  ADMIN: "ORG_ADMIN", // can create/onboard all the other roles below
  PRINCIPLE: "PRINCIPLE",
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
  SUPPORT_STAFF: {
    DRIVER: "DRIVER",
    LIBRARIAN: "LIBRARIAN",
  },
};
