module.exports = async function (context, req) {
  try {
    const data = {
      robots: [
        {
          name: 'Strawberries',
          model: 'iRobots'

        }, {
          name: 'Rachel',
          model: 'ECovacs'

        }, {
          name: 'Blue',
          model: 'Apple'

        },
      ],
    };
    const robots = data.robots;
    console.log("API");
    context.res.status(200).json(robots);
  } catch (error) {
    context.res.status(500).send(error);
  }
};