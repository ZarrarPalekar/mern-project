const Sector = require("../models/Sector");

const dataEntry = async (req, res) => {
  const sectorsData = [
    { value: 1, label: "Manufacturing" },
    { value: 19, label: "Construction materials", parent: 1 },
    { value: 18, label: "Electronics and Optics", parent: 1 },
    { value: 6, label: "Food and Beverage" },
    { value: 342, label: "Bakery & confectionery products", parent: 6 },
    { value: 43, label: "Beverages", parent: 6 },
    { value: 42, label: "Fish & fish products", parent: 6 },
    { value: 40, label: "Meat & meat products", parent: 6 },
    { value: 39, label: "Milk & dairy products", parent: 6 },
    { value: 437, label: "Other", parent: 6 },
    { value: 378, label: "Sweets & snack food", parent: 6 },
    { value: 13, label: "Furniture" },
    { value: 389, label: "Bathroom/sauna", parent: 13 },
    { value: 385, label: "Bedroom", parent: 13 },
    { value: 390, label: "Children’s room", parent: 13 },
    { value: 98, label: "Kitchen", parent: 13 },
    { value: 101, label: "Living room", parent: 13 },
    { value: 392, label: "Office", parent: 13 },
    { value: 394, label: "Other (Furniture)", parent: 13 },
    { value: 341, label: "Outdoor", parent: 13 },
    { value: 99, label: "Project furniture", parent: 13 },
    { value: 12, label: "Machinery" },
    { value: 94, label: "Machinery components", parent: 12 },
    { value: 91, label: "Machinery equipment/tools", parent: 12 },
    { value: 224, label: "Manufacture of machinery", parent: 12 },
    { value: 97, label: "Maritime", parent: 12 },
    { value: 271, label: "Aluminium and steel workboats", parent: 97 },
    { value: 269, label: "Boat/Yacht building", parent: 97 },
    { value: 230, label: "Ship repair and conversion", parent: 97 },
    { value: 93, label: "Metal structures", parent: 12 },
    { value: 508, label: "Other", parent: 12 },
    { value: 227, label: "Repair and maintenance service", parent: 12 },
    { value: 11, label: "Metalworking" },
    { value: 67, label: "Construction of metal structures", parent: 11 },
    { value: 263, label: "Houses and buildings", parent: 11 },
    { value: 267, label: "Metal products", parent: 11 },
    { value: 542, label: "Metal works", parent: 11 },
    { value: 75, label: "CNC-machining", parent: 11 },
    { value: 62, label: "Forgings, Fasteners", parent: 11 },
    { value: 69, label: "Gas, Plasma, Laser cutting", parent: 11 },
    { value: 66, label: "MIG, TIG, Aluminum welding", parent: 11 },
    { value: 9, label: "Plastic and Rubber" },
    { value: 54, label: "Packaging", parent: 9 },
    { value: 556, label: "Plastic goods", parent: 9 },
    { value: 559, label: "Plastic processing technology", parent: 9 },
    { value: 55, label: "Blowing", parent: 9 },
    { value: 57, label: "Moulding", parent: 9 },
    { value: 53, label: "Plastics welding and processing", parent: 9 },
    { value: 560, label: "Plastic profiles", parent: 9 },
    { value: 5, label: "Printing" },
    { value: 148, label: "Advertising", parent: 5 },
    { value: 150, label: "Book/Periodicals printing", parent: 5 },
    { value: 145, label: "Labelling and packaging printing", parent: 5 },
    { value: 7, label: "Textile and Clothing" },
    { value: 44, label: "Clothing", parent: 7 },
    { value: 45, label: "Textile", parent: 7 },
    { value: 8, label: "Wood" },
    { value: 337, label: "Other (Wood)", parent: 8 },
    { value: 51, label: "Wooden building materials", parent: 8 },
    { value: 47, label: "Wooden houses", parent: 8 },
    { value: 3, label: "Other" },
    { value: 37, label: "Creative industries", parent: 3 },
    { value: 29, label: "Energy technology", parent: 3 },
    { value: 33, label: "Environment", parent: 3 },
    { value: 2, label: "Service", parent: 3 },
    { value: 25, label: "Business services", parent: 3 },
    { value: 35, label: "Engineering", parent: 3 },
    {
      value: 28,
      label: "Information Technology and Telecommunications",
      parent: 3,
    },
    {
      value: 581,
      label: "Data processing, Web portals, E-marketing",
      parent: 28,
    },
    { value: 576, label: "Programming, Consultancy", parent: 28 },
    { value: 121, label: "Software, Hardware", parent: 28 },
    { value: 122, label: "Telecommunications", parent: 28 },
    { value: 22, label: "Tourism" },
    { value: 141, label: "Translation services", parent: 22 },
    { value: 21, label: "Transport and Logistics" },
    { value: 111, label: "Air", parent: 21 },
    { value: 114, label: "Rail", parent: 21 },
    { value: 112, label: "Road", parent: 21 },
    { value: 113, label: "Water", parent: 21 },
  ];

  try {
    const batchSize = 10;
    for (let i = 0; i < sectorsData.length; i += batchSize) {
      const batch = sectorsData.slice(i, i + batchSize);
      await Sector.insertMany(batch, { lean: true });
    }

    res.status(200).json({ message: "Data seeded successfully" });
  } catch (err) {
    console.error("Error seeding data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSectorsData = async (req, res) => {
  try {
    const sectors = await Sector.find({}, { _id: 0, __v: 0 });
    res.json(sectors);
  } catch (error) {
    console.error("Error fetching sectors data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getParentSectors = async (req, res) => {
  try {
    // Find sectors with no parent (top-level sectors)
    const parentSectors = await Sector.find({ parent: { $exists: false } });
    res.json(parentSectors);
  } catch (error) {
    console.error("Error fetching parent sectors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNextValue = async () => {
  try {
    const maxSector = await Sector.findOne({}, {}, { sort: { value: -1 } });
    return maxSector ? maxSector.value + 1 : 1;
  } catch (error) {
    console.error("Error fetching max value:", error);
    throw error;
  }
};

const saveNewSector = async (req, res) => {
  try {
    const { label, agree, parent } = req.body;
    const newSectorData = {
      label: label,
      agree: agree,
      parent: parent,
    };
    const nextValue = await getNextValue();
    const sectorToSave = new Sector({ ...newSectorData, value: nextValue });
    const savedSector = await sectorToSave.save();
    res
      .status(200)
      .json({ message: "Data seeded successfully", data: savedSector });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { dataEntry, getSectorsData, getParentSectors, saveNewSector };
