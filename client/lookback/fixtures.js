let date = new Date();

export const fixture_data = [
	{
		selectedDate: String(new Date(date.setDate(date.getDate() - 1))).substr(0,15),
		selectedDateParse: Date.parse(date),
		how_was_today: 8,
		focus: 4,
		people: [
	                {
	                  tag: 'Frank',
	                },
	                {
	                  tag: 'Maggie',
	                },                
	                {
	                  tag: 'Andy',
	                },
	                {
	                  tag: 'Jovonnie',
	                },
	                {
	                  tag: 'Jack',
	                },              
	              ],
		thought: "Phew I'm finally done with my midterm! Finished that at 2pm today and just spent the rest of the day hanging out with Frank and Savannah. No better way to spend an afternoon :)"
	},
	{
		selectedDate: String(new Date(date.setDate(date.getDate() - 1))).substr(0,15),
		selectedDateParse: Date.parse(date),
		how_was_today: 7,
		focus: 9,
		people: [
	                {
	                  tag: 'Scott',
	                },
	                {
	                  tag: 'Eric',
	                },                
	                {
	                  tag: 'Persis',
	                },
	                {
	                  tag: 'Visrut',
	                },             
	              ],
		thought: "I am in full study mode for my economics midterm! I really got kill it!"
	},
	{
		selectedDate: String(new Date(date.setDate(date.getDate() - 1))).substr(0,15),
		selectedDateParse: Date.parse(date),
		how_was_today: 6,
		focus: 5,
		people: [
	                {
	                  tag: 'Scott',
	                },
	                {
	                  tag: 'Eric',
	                },                
	                {
	                  tag: 'Persis',
	                },
	                {
	                  tag: 'Visrut',
	                },             
	              ],
		thought: "It was great getting coffee with Professor Maurel today. He is such a great guy!"
	},
	{
		selectedDate: String(new Date(date.setDate(date.getDate() - 1))).substr(0,15),
		selectedDateParse: Date.parse(date),
		how_was_today: 8,
		focus: 7,
		people: [
	                {
	                  tag: 'Joseph',
	                },
	                {
	                  tag: 'Chinmay',
	                },                
	                {
	                  tag: 'Frank',
	                },
	                {
	                  tag: 'Arielle',
	                },             
	              ],
		thought: "I spent most of today working on a paper for my philosophy class. Also I enjoyed lunch with Chinmay and Joseph."
	},
	{
		selectedDate: String(new Date(date.setDate(date.getDate() - 1))).substr(0,15),
		selectedDateParse: Date.parse(date),
		how_was_today: 7,
		focus: 3,
		people: [
	                {
	                  tag: 'Ana',
	                },
	                {
	                  tag: 'Arianna',
	                },                
	                {
	                  tag: 'Claire',
	                },
	                {
	                  tag: 'Ottavia',
	                }, 
	                {
	                  tag: 'Jovonnie',
	                },               
	              ],
		thought: "I went to dinner with Jovonnie and everyone from Ana's house tonight which was great. Afterwards we went to a cat themed party."
	}
];