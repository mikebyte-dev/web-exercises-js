import os
import json


# Define the root directory for projects: ✅
PROJECTS_ROOT = "projects"


def get_list_projects_name(PROJECTS_ROOT: str) -> list[str]:
    """This function gets a list of projects from the projects_root directory"""
    # Define the array of projects name
    return os.listdir(f"./{PROJECTS_ROOT}/")


# Get a description of the project: ✅
def get_description(PROJECTS_ROOT: str, project_name: str) -> str:
    """
    Gets the description of a project from the project/description.txt
    Args:
        PROJECTS_ROOT (str): Root of the projects are.
        project_name (str): name of the project to get the description.
    Returns:
        str: Return the description of the project.
    """
    description_path = f"{PROJECTS_ROOT}/{project_name}/description.txt"
    if os.path.exists(description_path):
        with open(description_path, "r") as description:
            return description.read().strip()
    else:
        print(f"Description file not found for project: {project_name}")
        return "No description available."


# Create a JSON file, with the projects information: ✅
def create_json_file(PROJECTS_ROOT: str) -> None:
    """
    This function creates a JSON file with the projects information
    Parameters:
        PROJECTS_ROOT (string): name of the directory where the projects are.
    Returns:
        None
    """
    # Create a list of projects
    list_to_json = []
    list_projects_name = get_list_projects_name(PROJECTS_ROOT)

    # Write the list of project information for each project name in the root
    # and add the project information to the list
    for index, project in enumerate(list_projects_name):
        project_info = {
            "id": index,
            "name": project,
            "path": f"./{PROJECTS_ROOT}/{project}/index.html",
            "description": get_description(PROJECTS_ROOT, project),
            "tumbnail": f"./{PROJECTS_ROOT}/{project}/src/assets/{project}.img",
        }

        print(f"Creating the data of -> {project}")
        list_to_json.append(project_info)

    # NOTE: Change the name of the document PATH_JSON_DATA to make functional.
    PATH_JSON_DATA = "./data/projects.json"

    # HACK: Right now the script remove the projects.json before to create it again all the file.
    # TODO: Implement logic to compare and update projects.json.
    if os.path.exists(PATH_JSON_DATA):
        os.remove(PATH_JSON_DATA)
        print(f"The file {PATH_JSON_DATA} exists and was remove")

    else:
        print(f"The file {PATH_JSON_DATA} don't exists")

    # Create the JSON file
    with open(PATH_JSON_DATA, "w") as json_file:
        # Write the projects names to the JSON file
        json_file.write(
            json.dumps(list_to_json, indent=2)
        )  # Convert list to string for simplicity

    print("projects.json was created. ✅")


# Execute the functions to create the JSON file
create_json_file(PROJECTS_ROOT)
