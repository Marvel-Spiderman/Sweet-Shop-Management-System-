let devices = [
  { id: 1, name: 'Main Lamp', type: 'bulb', room: 'Main Living', isOn: false, basePower: 60, sector: 'Sector Alpha' },
  { id: 2, name: 'Smart AC', type: 'ac', room: 'Sleep Pod', isOn: false, basePower: 1200, sector: 'Sector Alpha' },
  { id: 3, name: 'Space Heater', type: 'heater', room: 'Main Living', isOn: false, basePower: 1500, sector: 'Sector Alpha' },
  { id: 4, name: 'Smart Plug', type: 'plug', room: 'Kitchen', isOn: false, basePower: 200, sector: 'Sector Alpha' },
];

export const getDevices = (req, res) => {
  res.status(200).json(devices);
};

export const toggleDevice = (req, res) => {
  const { id } = req.params;
  const device = devices.find(d => d.id === parseInt(id));
  if (device) {
    device.isOn = !device.isOn;
    res.status(200).json(device);
  } else {
    res.status(404).json({ message: 'Device not found' });
  }
};

export const addDevice = (req, res) => {
  const newDevice = {
    ...req.body,
    id: Date.now(),
    isOn: false
  };
  devices.push(newDevice);
  res.status(201).json(newDevice);
};

export const deleteDevice = (req, res) => {
  const { id } = req.params;
  const index = devices.findIndex(d => d.id == id);
  
  if (index !== -1) {
    devices.splice(index, 1);
    res.status(200).json({ message: 'Device deleted', id });
  } else {
    res.status(404).json({ message: 'Device not found' });
  }
};
