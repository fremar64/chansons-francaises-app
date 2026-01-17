import { generateKeyPair, exportPKCS8, exportSPKI } from "jose";
import { writeFileSync } from "fs";


(async () => {
  const { privateKey, publicKey } = await generateKeyPair("RS256", {
    modulusLength: 4096,
    extractable: true
  });

  const pkcs8 = await exportPKCS8(privateKey);
  const spki = await exportSPKI(publicKey);

  writeFileSync("ceredis-root-private.pem", pkcs8);
  writeFileSync("ceredis-root-public.pem", spki);

  console.log("==== CEREDIS ROOT PRIVATE KEY (PPK) ====");
  console.log(pkcs8);
  console.log("");
  console.log("==== CEREDIS ROOT PUBLIC KEY (PK / Identifier) ====");
  console.log(spki);
  console.log("");
  console.log("Clés générées et sauvegardées dans :");
  console.log("ceredis-root-private.pem (clé privée, à stocker hors ligne)");
  console.log("ceredis-root-public.pem (clé publique, à utiliser comme @owner CaSS)");
})();
