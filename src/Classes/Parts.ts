import type HasPartData from "../Interfaces/HasPartData";

export default class Parts {
    public parts: HasPartData[] = [];

    /**
     * Initializing help.
     * 
     * @param help  Help data.
     * 
     * @since 1.0.0
     */
     public constructor( parts: HasPartData[] = [] ){
        if( parts.length === 0 ) {
            this.parts = parts = [
                {
                    width: 10.0,
                    length: 10.0,
                    height: 2.5,
                    horizontalOffset:0,
                    verticalOffset:0
                }
            ];
        } else {
            this.parts = parts;
        }
    }

    public new() {
        let part = {
            width: 10.0,
            length: 10.0,
            height: 2.5,
            horizontalOffset:0,
            verticalOffset:0
        };

        this.add( part );
    };

    public add( part: HasPartData )
    {
        this.parts.push( part )
    }

    public delete( key: number )
    {
        let partsFiltered: HasPartData[] = [];

        for ( let currentKey in this.parts ) {
            
            if( parseInt( currentKey ) != parseInt( key ) )
            {
                partsFiltered.push( this.parts[key] );
            }
        }

        this.parts = partsFiltered;
    }
}