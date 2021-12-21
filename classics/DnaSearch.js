const Nucleotide = Object.freeze({
  A: "A",
  C: "C",
  G: "G",
  T: "T"
});

class Codon {
  constructor(codonStr) {
    this.first = Nucleotide[codonStr.slice(0, 1)];
    this.second = Nucleotide[codonStr.slice(1, 2)];
    this.third = Nucleotide[codonStr.slice(2, 3)];
  }

  compareTo(otherCodon) {
    return this.doCompare(otherCodon, ['first', 'second', 'third'], 0);
  }

  doCompare(obj, keys, start) {
    const key = keys[start];
    if (this[key] < obj[key]) {
      return -1;
    } else if (this[key] === obj[key]) {
      if (start === keys.length) {
        return 0;
      }
      return this.doCompare(obj, keys, start + 1);
    } else {
      return 1;
    }
  }
}

class Gene {
  codons = [];

  constructor(geneStr) {
    for(let i = 0; i < geneStr.length - 2; i += 3) {
      this.codons.push(new Codon(geneStr.slice(i, i + 3)));
    }
  }

  sort() {
    this.codons.sort((a, b) => a.compareTo(b));
    console.log(this.codons);
  }

  binarySearch(codonStr) {
    let low = 0;
    let high = this.codons.length - 1;
    while (low <= high) {
      const mid = Math.floor(low + (high - low) /2);
      const compare = new Codon(codonStr).compareTo(this.codons[mid]);
      if (compare === 0) {
        return true;
      }
      if (compare < 0) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return false;
  }
}

const geneStr = 'ACGTGGCTCTCTAACGTACGTACGTACGGGGTTTATATATACCCTAGGACTCCCTTT';

const gene = new Gene(geneStr);
gene.sort();

console.log(gene.binarySearch('CCC'))
console.log(gene.binarySearch('GTC'))
console.log(gene.binarySearch('AAA'))
console.log(gene.binarySearch('TGG'))


