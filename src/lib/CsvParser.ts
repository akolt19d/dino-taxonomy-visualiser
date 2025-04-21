import { DinosaurBuilder } from "./classes/DinosaurBuilder";

export function parseCsv(data: string): ParsedData {
    const rows = data.split('\n').map(row => row.split(','))
    const headers = rows.shift()
    let taxonomies: string[][] = []
    const dinosaurs: Dinosaur[] = rows.map(row => {
        const dinosaurBuilder = new DinosaurBuilder()
            .setName(row[0])
            .setDiet(row[1] as "herbivorous" | "carnivorous" | "omnivorous")
            .setPeriod(row[2])
            .setLivedIn(row[3])
            .setType(row[4])
            .setLength(row[5])
            // .setTaxonomy(row[6].split(' '))
            .setNamedBy(row[7])
            .setSpecies(row[8])
            .setLink(row[9]);
        let tx = row[6].split(' ')
        tx.push(row[0])
        tx.shift()

        taxonomies.push(tx)
        return dinosaurBuilder.build();
    })

    return {
        dinosaurs,
        taxonomies
    };
}