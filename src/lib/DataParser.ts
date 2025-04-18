import { DinosaurBuilder } from "./DinosaurBuilder";

export function parseCsv(data: string): Dinosaur[] {
    const rows = data.split('\n').map(row => row.split(','))
    const headers = rows.shift()
    
    const dinosaurs: Dinosaur[] = rows.map(row => {
        const dinosaurBuilder = new DinosaurBuilder()
            .setName(row[0])
            .setDiet(row[1] as "herbivorous" | "carnivorous" | "omnivorous")
            .setPeriod(row[2])
            .setLivedIn(row[3])
            .setType(row[4])
            .setLength(row[5])
            .setTaxonomy(row[6].split(' '))
            .setNamedBy(row[7])
            .setSpecies(row[8])
            .setLink(row[9]);
        return dinosaurBuilder.build();
    })

    return dinosaurs;
}