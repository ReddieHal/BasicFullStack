# Vulnerability Report for ReddieHal

By Alexis Ramirez using Snyk and Fossa

### Dependencies

 - Package: "nth-check"
	 - Vulnerabilty: Regular Expression Denial of Service (ReDoS)
	 - Severity: High
   - Fixed in nth-check@2.0.1
   - Fix: Upgrade nth-check to version 2.0.1 or higher.
   - Current version used in project: 2.1.0
   - Result: Did not fix
 - Package: "inflight"
	 - Vulnerabilty: Missing Release of Resource after Effective Lifetime
   - Severity: Medium
   - Fix: No remediation path available
   - Note: This library is not maintained, and currently, there is no fix for this issue. To overcome this vulnerability, several dependent packages have eliminated the use of this library.
   - Result: Did not fix
- Package: "serialize-javascript"
	 - Vulnerabilty: Cross-site Scripting (XSS)
   - Severity: Medium
   - Affecting serialize-javascript package, versions <6.0.2
   - Fixed in: serialize-javascript@6.0.2
   - Fix: Upgrade serialize-javascript to version 6.0.2 or higher.
   - Current version used in project: 6.0.1
   - Result: Upgraded serialize-javascript in frontend directory
 - Package: "postcss"
	 - Vulnerabilty: Improper Input Validation
   - Severity: Medium
   - Affecting "postcss" package, versions <8.4.31
   - Fixed in postcss@8.4.31
   - Fix: Upgrade serialize-javascript to version 6.0.2 or higher.
   - Current version used in project: 8.4.33
   - Result: No need to fix currently

### Licensing

 - Module: "node-forge"
	 - Licenses:  GPL-2.0-only, GPL-1.0-or-later, BSD-3-Clause, mit-addition, MIT
   - Flagged Licenses: GPL-2.0-only
	 - According to Fossa: 
     - "These packages contain code files that may require you to disclose your source code under a compatible license, unless they’re distributed and run as completely separate processes & packages."

### Code Security

 - Vulnerabilty: Information Exposure
   - Snyk Comment: "Disable X-Powered-By header for your Express app (consider using Helmet middleware), because it exposes information about the used framework to potential attackers"
   - Result: I installed "helmet" package and configured backend app to use it
 - Vulnerabilty: Cross-Site Request Forgery (CSRF) 
   - Snyk Comment: "CSRF protection is disabled for your Express app. This allows the attackers to execute requests on a user's behalf."
   - Result: Set Same-Site attribute for cookie in fronted to "strict". This is just one of several ways to deal with CSRF without resorting to using "csurf" which is a depricated package with security issues.
 - Vulnerabilty: Improper Type Validation
   - Code in question:
```
      const isPasswordOk = (pwd) => {
    return pwd.length >= 8 && /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /[0-9]/.test(pwd);
}
```
   - Snyk Comment: "The type of this object, coming from body and the value of its length property can be controlled by the user. An attacker may craft the properties of the object to crash the application or bypass its logic. Consider checking the type of the object."
   - Result: I checked the type of "pwd" by using the "typeof" operator.

 ### Final Notes

 - I updated a package in the frontend node modules and updated its SBOM.
 - I installed a package in the backend and updated its SBOM
 - Did not update combined SBOM as I was not sure how that was created.
