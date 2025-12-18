onmessage = function(e) {
    const data = e.data;
    
    if (data.type === 'factorial') {
        calculateFactorial(data.number);
    } else if (data.type === 'primes') {
        findPrimes(data.number);
    }
};

function calculateFactorial(n) {
    const startTime = performance.now();
    
    let result = 1n;
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }
    
    const endTime = performance.now();
    const time = endTime - startTime;
    
    postMessage({
        type: 'factorial',
        input: n,
        result: result.toString(),
        time: time.toFixed(2)
    });
}

function findPrimes(limit) {
    const startTime = performance.now();
    
    const primes = [];
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i <= limit; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= limit; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    for (let i = 2; i <= limit; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }
    
    const endTime = performance.now();
    const time = endTime - startTime;
    
    postMessage({
        type: 'primes',
        input: limit,
        result: primes,
        time: time.toFixed(2)
    });
}