import { describe, test, it, expect } from 'vitest';
import { getCompletedTrainingCount, getPeopleByFiscalYear,  getExpiringTrainings} from '../src/data_filter';

describe('getCompletedTrainingCount', () => {
    it('should return the correct count of people who completed each training', () => {
      const data = [
        {
          "name": "Jaelyn Quinn",
          "completions": [
            {
              "name": "Electrical Safety for Labs",
              "timestamp": "8/31/2022",
              "expires": null
            },
            {
              "name": "Safe Handling of Human Cell Lines/Materials in a Research Laboratory",
              "timestamp": "10/30/2023",
              "expires": null
            },
            {
              "name": "Awareness Training for the Transport of Hazardous Material",
              "timestamp": "10/5/2023",
              "expires": null
            },
            {
              "name": "X-Ray Safety",
              "timestamp": "4/8/2023",
              "expires": null
            }
          ]
        },
        {
          "name": "Asia Duke",
          "completions": [
            {
              "name": "X-Ray Safety",
              "timestamp": "9/1/2022",
              "expires": null
            },
            {
              "name": "X-Ray Safety",
              "timestamp": "7/5/2023",
              "expires": null
            },
            {
              "name": "Radiation Safety Annual Refresher",
              "timestamp": "9/23/2022",
              "expires": null
            },
            {
              "name": "Awareness Training for the Transport of Hazardous Material",
              "timestamp": "8/8/2023",
              "expires": null
            }
          ]
        },
        {
          "name": "Cason Gross",
          "completions": [
            {
              "name": "Using Hazardous Chemicals in an Animal Care Facility",
              "timestamp": "8/19/2023",
              "expires": "8/18/2024"
            },
            {
              "name": "Chemical Waste Requirements",
              "timestamp": "9/27/2023",
              "expires": "9/26/2024"
            },
            {
              "name": "Using Hazardous Chemicals in an Animal Care Facility",
              "timestamp": "7/29/2023",
              "expires": null
            },
            {
              "name": "Safety Practices and Procedures to Prevent Zoonotic Diseases While Working With Cattle",
              "timestamp": "11/29/2022",
              "expires": null
            }
          ]
        },
        {
          "name": "Hector Dixon",
          "completions": [
            {
              "name": "Awareness Training for the Transport of Hazardous Material",
              "timestamp": "11/9/2022",
              "expires": null
            }
          ]
        },
        {
          "name": "Josephine Cantrell",
          "completions": [
            {
              "name": "Transportation of Infectious Substances, Category B",
              "timestamp": "9/12/2022",
              "expires": null
            },
            {
              "name": "Working in Cold Temperatures",
              "timestamp": "9/26/2023",
              "expires": null
            }
          ]
        }];
      const result = getCompletedTrainingCount(data);
  
      expect(result).toEqual(
        {  "Awareness Training for the Transport of Hazardous Material": 3,
            "Chemical Waste Requirements": 1,
            "Electrical Safety for Labs": 1,
            "Radiation Safety Annual Refresher": 1,
            "Safe Handling of Human Cell Lines/Materials in a Research Laboratory": 1,
            "Safety Practices and Procedures to Prevent Zoonotic Diseases While Working With Cattle": 1,
            "Transportation of Infectious Substances, Category B": 1,
            "Using Hazardous Chemicals in an Animal Care Facility": 1,
            "Working in Cold Temperatures": 1,
            "X-Ray Safety": 2}
      );
    });
});

describe('getPeopleByFiscalYear', () => {
    it('should return people who completed specified trainings in the fiscal year 2024', () => {
        const data = [
            {
              "name": "Jaelyn Quinn",
              "completions": [
                {
                  "name": "Electrical Safety for Labs",
                  "timestamp": "8/31/2022",
                  "expires": null
                },
                {
                  "name": "Safe Handling of Human Cell Lines/Materials in a Research Laboratory",
                  "timestamp": "10/30/2023",
                  "expires": null
                },
                {
                  "name": "Awareness Training for the Transport of Hazardous Material",
                  "timestamp": "10/5/2023",
                  "expires": null
                },
                {
                  "name": "X-Ray Safety",
                  "timestamp": "4/8/2023",
                  "expires": null
                }
              ]
            },
            {
              "name": "Asia Duke",
              "completions": [
                {
                  "name": "X-Ray Safety",
                  "timestamp": "9/1/2022",
                  "expires": null
                },
                {
                  "name": "X-Ray Safety",
                  "timestamp": "7/5/2023",
                  "expires": null
                },
                {
                  "name": "Radiation Safety Annual Refresher",
                  "timestamp": "9/23/2022",
                  "expires": null
                },
                {
                  "name": "Awareness Training for the Transport of Hazardous Material",
                  "timestamp": "8/8/2023",
                  "expires": null
                }
              ]
            },
            {
              "name": "Cason Gross",
              "completions": [
                {
                  "name": "Using Hazardous Chemicals in an Animal Care Facility",
                  "timestamp": "8/19/2023",
                  "expires": "8/18/2024"
                },
                {
                  "name": "Chemical Waste Requirements",
                  "timestamp": "9/27/2023",
                  "expires": "9/26/2024"
                },
                {
                  "name": "Using Hazardous Chemicals in an Animal Care Facility",
                  "timestamp": "7/29/2023",
                  "expires": null
                },
                {
                  "name": "Safety Practices and Procedures to Prevent Zoonotic Diseases While Working With Cattle",
                  "timestamp": "11/29/2022",
                  "expires": null
                }
              ]
            },
            {
              "name": "Hector Dixon",
              "completions": [
                {
                  "name": "Awareness Training for the Transport of Hazardous Material",
                  "timestamp": "11/9/2022",
                  "expires": null
                }
              ]
            },
            {
              "name": "Josephine Cantrell",
              "completions": [
                {
                  "name": "Transportation of Infectious Substances, Category B",
                  "timestamp": "9/12/2022",
                  "expires": null
                },
                {
                  "name": "Working in Cold Temperatures",
                  "timestamp": "9/26/2023",
                  "expires": null
                }
              ]
            }];
      const trainings = ["Electrical Safety for Labs", "X-Ray Safety", "Laboratory Safety Training"];
      const fiscalYear = 2023;
      const result = getPeopleByFiscalYear(data, trainings, fiscalYear);
  
      expect(result).toEqual({
        "Electrical Safety for Labs": [],
        "X-Ray Safety": [],
        "Laboratory Safety Training": ["Asia Duke"]
      });
    });
});

describe('getExpiringTrainings', () => {
    it('should return people whose trainings have expired or will expire within a month of Oct 1st, 2023', () => {
        const data = [
            {
              "name": "Jaelyn Quinn",
              "completions": [
                {
                  "name": "Electrical Safety for Labs",
                  "timestamp": "8/31/2022",
                  "expires": null
                },
                {
                  "name": "Safe Handling of Human Cell Lines/Materials in a Research Laboratory",
                  "timestamp": "10/30/2023",
                  "expires": null
                },
                {
                  "name": "Awareness Training for the Transport of Hazardous Material",
                  "timestamp": "10/5/2023",
                  "expires": null
                },
                {
                  "name": "X-Ray Safety",
                  "timestamp": "4/8/2023",
                  "expires": null
                }
              ]
            },
            {
              "name": "Asia Duke",
              "completions": [
                {
                  "name": "X-Ray Safety",
                  "timestamp": "9/1/2022",
                  "expires": null
                },
                {
                  "name": "X-Ray Safety",
                  "timestamp": "7/5/2023",
                  "expires": null
                },
                {
                  "name": "Radiation Safety Annual Refresher",
                  "timestamp": "9/23/2022",
                  "expires": null
                },
                {
                  "name": "Awareness Training for the Transport of Hazardous Material",
                  "timestamp": "8/8/2023",
                  "expires": null
                }
              ]
            },
            {
              "name": "Cason Gross",
              "completions": [
                {
                  "name": "Using Hazardous Chemicals in an Animal Care Facility",
                  "timestamp": "8/19/2023",
                  "expires": "8/18/2024"
                },
                {
                  "name": "Chemical Waste Requirements",
                  "timestamp": "9/27/2023",
                  "expires": "9/26/2024"
                },
                {
                  "name": "Using Hazardous Chemicals in an Animal Care Facility",
                  "timestamp": "7/29/2023",
                  "expires": null
                },
                {
                  "name": "Safety Practices and Procedures to Prevent Zoonotic Diseases While Working With Cattle",
                  "timestamp": "11/29/2022",
                  "expires": null
                }
              ]
            },
            {
              "name": "Hector Dixon",
              "completions": [
                {
                  "name": "Awareness Training for the Transport of Hazardous Material",
                  "timestamp": "11/9/2022",
                  "expires": null
                }
              ]
            },
            {
              "name": "Josephine Cantrell",
              "completions": [
                {
                  "name": "Transportation of Infectious Substances, Category B",
                  "timestamp": "9/12/2022",
                  "expires": null
                },
                {
                  "name": "Working in Cold Temperatures",
                  "timestamp": "9/26/2023",
                  "expires": null
                }
              ]
            }];
      const checkDate = new Date('2024-10-01');
      const result = getExpiringTrainings(data, checkDate);
  
      expect(result).toEqual([
        {
          name: "Cason Gross",
          trainings: [
            { name: "Chemical Waste Requirements", status: "expired" },
          ]
        }
      ]);
    });
  });