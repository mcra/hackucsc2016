# hackucsc2016

Hack UCSC 2016

### Get the code and install Django and dependencies
```
# Clone the repo
git clone git@github.com:mcra/hackucsc2016.git
cd hackucsc2016

# Create and activate a new virtualenv
virtualenv --distribute --prompt='(*) ' env
. env/bin/activate

# Install required Python packages
pip install -r requirements.txt

# Initial Django setup
cd server
python manage.py migrate
python manage.py loaddata fixtures/*.json
```
