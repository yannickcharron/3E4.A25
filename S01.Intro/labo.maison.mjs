import os from "os";

console.log("===== Vérification de Node.js =====");
console.log("Version de Node.js :", process.version);
console.log("Chemin d’exécution :", process.execPath);
console.log("Plateforme :", process.platform);
console.log("Architecture :", process.arch);

console.log("\n===== Informations sur l'hôte =====");
console.log("Nom de l'hôte :", os.hostname());
console.log("Système d'exploitation :", os.type(), os.release());
console.log("Total mémoire (Mo) :", Math.round(os.totalmem() / (1024 * 1024)));
console.log("Mémoire libre (Mo) :", Math.round(os.freemem() / (1024 * 1024)));
console.log("CPU(s) :", os.cpus().length, "coeur(s)");
console.log("Uptime (sec) :", os.uptime());

console.log("\n===== Interfaces Réseau =====");
const interfaces = os.networkInterfaces();
for (const [nom, infos] of Object.entries(interfaces)) {
    infos.forEach((iface) => {
        console.log(`- ${nom} | Adresse : ${iface.address} | Famille : ${iface.family} | Interne : ${iface.internal}`);
    });
}

console.log("\nTout fonctionne ! ✅");