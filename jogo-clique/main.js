let clicks = 0;
let valorDoClique = 1;
let clickPerSecond = 0;
let criticalClicks = 0;
let criticalChance = 0.1;
let upgrade1Cost = 10;
let upgrade2Cost = 100;
let upgrade3Cost = 500;
let criticalMultiplier = 2;

const upgrade2CostElem = document.getElementById('upgrade2Cost');
if (upgrade2CostElem) {
    upgrade2CostElem.textContent = upgrade2Cost;
}

const upgrade1CostElem = document.getElementById('upgrade1Cost');
if (upgrade1CostElem) {
    upgrade1CostElem.textContent = upgrade1Cost;
}

const upgrade3CostElem = document.getElementById('upgrade3Cost');
if (upgrade3CostElem) {
    upgrade3CostElem.textContent = upgrade3Cost;
}

const botao = document.querySelector('.clickButton');
const clicksCount = document.getElementById('clickCount');

if (botao && clicksCount) {
    botao.addEventListener('click', function() {
        let isCritical = Math.random() < criticalChance;
        let ganho = valorDoClique;
        if (isCritical) {
            ganho *= criticalMultiplier;
        }
        clicks += ganho;
        clicksCount.textContent = formatNumber(clicks);
        mostrarUpgradesDisponiveis();
    });
}

const buyUpgrade1 = document.getElementById('buyUpgrade1');

if (buyUpgrade1 && clicksCount && upgrade1CostElem) {
    buyUpgrade1.addEventListener('click', function() {
        if (clicks >= upgrade1Cost) {
            clicks -= upgrade1Cost;
            valorDoClique += 1;
            upgrade1Cost = Math.floor(upgrade1Cost * 1.5);
            clicksCount.textContent = clicks;
            upgrade1CostElem.textContent = upgrade1Cost;
            atualizarValoresUpgrades();
        }
    });
}

const buyUpgrade2 = document.getElementById('buyUpgrade2');

if (buyUpgrade2 && clicksCount && upgrade2CostElem) {
    buyUpgrade2.addEventListener('click', function() {
        if (clicks >= upgrade2Cost) {
            clicks -= upgrade2Cost;
            clickPerSecond += 1;
            upgrade2Cost = Math.floor(upgrade2Cost * 1.5);
            clicksCount.textContent = clicks;
            upgrade2CostElem.textContent = upgrade2Cost;
            atualizarValoresUpgrades();
        }
    });
}

const buyUpgrade3 = document.getElementById('buyUpgrade3');

if (buyUpgrade3 && clicksCount && upgrade3CostElem) {
    buyUpgrade3.addEventListener('click', function() {
        if (clicks >= upgrade3Cost) {
            clicks -= upgrade3Cost;
            criticalChance += 0.05;
            if (criticalChance > 1) criticalChance = 1;
            upgrade3Cost = Math.floor(upgrade3Cost * 1.5);
            clicksCount.textContent = clicks;
            upgrade3CostElem.textContent = upgrade3Cost;
            atualizarValoresUpgrades();
        }
    });
}

function formatNumber(num) {
    if (num < 1000) return num;
    const units = [
        "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No",
        "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod",
        "Vg", "Uv", "Dv", "Tv", "Qav", "Qiv", "Sxv", "Spv", "Ocv", "Nov"
    ];
    let unit = -1;
    while (num >= 1000 && unit < units.length - 1) {
        num /= 1000;
        unit++;
    }
    return num.toFixed(2) + units[unit];
}

function atualizarValoresUpgrades() {
    const upgrade1Value = document.getElementById('upgrade1Value');
    const upgrade2Value = document.getElementById('upgrade2Value');
    const upgrade3Value = document.getElementById('upgrade3Value');
    if (upgrade1Value) upgrade1Value.textContent = formatNumber(valorDoClique);
    if (upgrade2Value) upgrade2Value.textContent = formatNumber(clickPerSecond);
    if (upgrade3Value) upgrade3Value.textContent = `${Math.round(criticalChance * 100)}%`;
}

atualizarValoresUpgrades();

setInterval(function() {
    if (clickPerSecond > 0 && clicksCount) {
        clicks += clickPerSecond;
        clicksCount.textContent = formatNumber(clicks);
        mostrarUpgradesDisponiveis();
    }
}, 1000);

function mostrarUpgradesDisponiveis() {
    if (clicks >= upgrade1Cost && upgrade1CostElem) {
        const item = upgrade1CostElem.closest('.upgradeItem');
        if (item) item.classList.remove('hidden');
    }
    if (clicks >= upgrade2Cost && upgrade2CostElem) {
        const item = upgrade2CostElem.closest('.upgradeItem');
        if (item) item.classList.remove('hidden');
    }
    if (clicks >= upgrade3Cost && upgrade3CostElem) {
        const item = upgrade3CostElem.closest('.upgradeItem');
        if (item) item.classList.remove('hidden');
    }
}


