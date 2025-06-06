export class DinosaurBuilder {
    private dinosaur: Dinosaur = {
        name: "",
        diet: "herbivorous",
        period: "",
        livedIn: "",
        type: "",
        length: "",
        // taxonomy: [],
        namedBy: "",
        species: "",
        link: "",
        imgLink: "",
    }

    public setName(name: string): DinosaurBuilder {
        this.dinosaur.name = name;
        return this;
    }

    public setDiet(diet: "herbivorous" | "carnivorous" | "omnivorous"): DinosaurBuilder {
        this.dinosaur.diet = diet;
        return this;
    }

    public setPeriod(period: string): DinosaurBuilder {
        this.dinosaur.period = period;
        return this;
    }

    public setLivedIn(livedIn: string): DinosaurBuilder {
        this.dinosaur.livedIn = livedIn;
        return this;
    }

    public setType(type: string): DinosaurBuilder {
        this.dinosaur.type = type;
        return this;
    }

    public setLength(length: string): DinosaurBuilder {
        this.dinosaur.length = length;
        return this;
    }

    // public setTaxonomy(taxonomy: string[]): DinosaurBuilder {
    //     this.dinosaur.taxonomy = taxonomy;
    //     return this;
    // }

    public setNamedBy(namedBy: string): DinosaurBuilder {
        this.dinosaur.namedBy = namedBy;
        return this;
    }

    public setSpecies(species: string): DinosaurBuilder {
        this.dinosaur.species = species;
        return this;
    }

    public setLink(link: string): DinosaurBuilder {
        this.dinosaur.link = link;
        return this;
    }

    public setImgLink(imgLink: string): DinosaurBuilder {
        this.dinosaur.imgLink = imgLink;
        return this;
    }

    public build(): Dinosaur {
        return { ...this.dinosaur };
    }
}